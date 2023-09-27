import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes.component';
import { FilmePesquisadoComponent } from './pages/filme-pesquisado/filme-pesquisado.component';
const routes: Routes = [
{
  path:'',
  redirectTo: 'home',
  pathMatch:'full',
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'filme-detalhes/:id',
  component: FilmeDetalhesComponent
},
{
  path: 'filme-pesquisado',
  component: FilmePesquisadoComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
