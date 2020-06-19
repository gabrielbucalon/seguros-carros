import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguro } from '../models/Seguro';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
 
@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private API_SEGUROS = 'http://localhost:9000/';


  constructor(private http: HttpClient,
    private onlineOfflineSerivce: OnlineOfflineService) {
    this.ouvirStatusConexao();
  }


  private salvarAPI(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + 'api/seguros', seguro).subscribe(() => {
      alert('Seguro foi cadastrado com sucesso')
    }, error => {
      alert('Erro ao cadastrar o seguro')
    });
  }

  ouvirStatusConexao() {
    this.onlineOfflineSerivce.statusConexao.subscribe(online => {
      if (online) {
        console.log("status online");
      } else {
        console.log("estou offline");
      }
    });
  }

  public cadastrar(seguro: Seguro) {
    this.http.post(this.API_SEGUROS + `api/seguros`, seguro).subscribe(() => {
      if (this.onlineOfflineSerivce.isOnline) {
        this.salvarAPI(seguro);
      } else {
        console.log('salvar seguro no banco local');
      }
    });
  }

  listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(this.API_SEGUROS + 'api/seguros');
  }
}
