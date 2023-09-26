import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmePesquisado } from 'src/app/models/filme-buscado';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filme-pesquisado',
  templateUrl: './filme-pesquisado.component.html',
  styleUrls: ['./filme-pesquisado.component.css']
})
export class FilmePesquisadoComponent implements OnInit {
  filmePesquisado: FilmePesquisado[];

  constructor(
    private filmeService: FilmeService,
    private route: ActivatedRoute) {
    this.filmePesquisado = []
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selecionarFilmesDetalhesPorTitulo(params['query']);
      }
    );
  }

  selecionarFilmesDetalhesPorTitulo(titulo: string) {  
    if(titulo == ' ') {
      this.filmePesquisado = [];
      return;
    }

    this.filmeService.selecionarFilmePesquisadoPorTitulo(titulo).subscribe(filmesDetalhes => {
      this.filmePesquisado = filmesDetalhes;
    });
  }
}
