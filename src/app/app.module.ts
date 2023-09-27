import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptimizedImage } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { BuscarFilmeComponent } from './shared/buscar-filme/buscar-filme.component';
import { FormsModule } from '@angular/forms';
import { FilmePesquisadoComponent } from './pages/filme-pesquisado/filme-pesquisado.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Icons } from 'ng-bootstrap-icons/bootstrap-icons/icons.provider';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FilmeDetalhesComponent,
    CardFilmeComponent,
    PaginationComponent,  
    SafeUrlPipe, BuscarFilmeComponent, FilmePesquisadoComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgbPaginationModule,
    NgOptimizedImage,
    FormsModule,
    BrowserAnimationsModule,  
    IconsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
