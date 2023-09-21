import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListagemFilmesComponent } from './components/listagem-filmes/listagem-filmes.component';
import { DetalhesFilmesComponent } from './components/detalhes-filmes/detalhes-filmes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListagemFilmesComponent,
    DetalhesFilmesComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
