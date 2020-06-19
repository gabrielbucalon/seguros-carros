import { Component, OnInit } from '@angular/core';
import { Seguro } from 'src/app/models/Seguro';
import { Observable } from 'rxjs';
import { MarcaCarroService } from 'src/app/services/marca-carro.service';
import { MarcaCarro } from 'src/app/models/MarcaCarro';
import { SeguroService } from 'src/app/services/seguro.service';

@Component({
  selector: 'app-cadastro-seguros',
  templateUrl: './cadastro-seguros.component.html',
  styleUrls: ['./cadastro-seguros.component.css']
})
export class CadastroSegurosComponent implements OnInit {

  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]>;

  constructor(private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService) {

  }

  enviarNotificacao() {

  }

  cadastrar(){
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.salvar(this.seguro);
  }

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

}
