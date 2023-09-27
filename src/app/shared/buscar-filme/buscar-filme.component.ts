import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-filme',
  templateUrl: './buscar-filme.component.html',
  styleUrls: ['./buscar-filme.component.css']
})
export class BuscarFilmeComponent {
  queryPesquisa: string = '';

  constructor(private router: Router){}

  pesquisarFilmes(){
      this.router.navigate([`filme-pesquisado`],
      {queryParams: {query: this.queryPesquisa}})
    };
}
