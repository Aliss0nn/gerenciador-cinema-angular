import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmePesquisado } from 'src/app/models/filme-buscado';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filme-pesquisado',
  templateUrl: './filme-pesquisado.component.html',
  styleUrls: ['./filme-pesquisado.component.css']
})
export class FilmePesquisadoComponent implements OnInit {

  constructor(private filmeService: FilmeService, private router: Router, private route: ActivatedRoute){}

  queryPesquisa: string = ''
  filmePesquisado: FilmePesquisado[] = []

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.queryPesquisa = param['query'];
      this.pesquisarFilmes();
    })
  }

  pesquisarFilmes(){
    this.filmeService.PesquisarFilmes(this.queryPesquisa).subscribe(res => {
      this.filmePesquisado = this.filmeService.mapearFilmesBusca(res.results);
    });
  }
}
