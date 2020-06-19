import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguro } from '../models/Seguro';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private API_SEGUROS = 'http://localhost:9000/';
  private db: Dexie;
  private table: Dexie.Table<Seguro, any> = null;


  constructor(private http: HttpClient,
    private onlineOfflineSerivce: OnlineOfflineService) {
    this.ouvirStatusConexao();
    this.iniciarDexedDb();
  }

  private iniciarDexedDb() {
    this.db = new Dexie('db-seguros');
    this.db.version(1).stores({
      seguro: 'id'
    });

    this.table = this.db.table('seguro');
  }


  private salvarAPI(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + 'api/seguros', seguro).subscribe(() => {
      alert('Seguro foi cadastrado com sucesso')
    }, error => {
      alert('Erro ao cadastrar o seguro')
    });
  }

  private async salvarIndexedDb(seguro: Seguro) {
    try {
      await this.table.add(seguro);
      const todosSeguros: Seguro[] = await this.table.toArray();
      console.log('Seguro foi salvo no indexedDb', todosSeguros);      
    } catch (error) {
      console.log("erro ao incluir seguro no indexedDb", error);
    }
  }

  private async enviarIndexedDbParaAPI(){
    const todosSeguros: Seguro[] = await this.table.toArray();

    for (const seguro of todosSeguros) {
      this.salvarAPI(seguro);
      await this.table.delete(seguro.id);
      console.log(`seguro com o id ${seguro.id} foi excluido com sucesso`)
    }
  }

  ouvirStatusConexao() {
    this.onlineOfflineSerivce.statusConexao.subscribe(online => {
      if (online) {
        this.enviarIndexedDbParaAPI();
      } else {
        
      }
    });
  }

  public salvar(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + `api/seguros`, seguro).subscribe(() => {
      if (this.onlineOfflineSerivce.isOnline) {
        alert("salvando ONLINE");
        this.salvarAPI(seguro);
      } else {
        alert("salvando OFFLINE");
        this.salvarIndexedDb(seguro);
      }
    });
  }

  listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(this.API_SEGUROS + 'api/seguros');
  }
}
