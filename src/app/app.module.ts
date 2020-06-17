import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuComponent } from './components/menu/menu.component';
import { CadastroSegurosComponent } from './components/cadastro-seguros/cadastro-seguros.component';
import { ListarSegurosComponent } from './components/listar-seguros/listar-seguros.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CadastroSegurosComponent,
    ListarSegurosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
