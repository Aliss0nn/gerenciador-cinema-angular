import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Historico } from 'src/app/models/historico';
import { Filme } from 'src/app/models/listagem-filmes';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filmes: Filme[] = [];
  listagemTipo?: string;
  historico: Historico;
  ehPaginado: boolean;
  paginaAtual: number;

  
  constructor(private filmeService: FilmeService, 
    private localStorageService: LocalStorageService,
    private router: Router
    ) {
    this.listagemTipo = 'populares';
    this.historico = new Historico([]);
    this.ehPaginado = true;
    this.paginaAtual = 1;
  }

  ngOnInit(): void {
    this.historico = this.localStorageService.carregarDados();
    this.selecionarFilmesPopulares();
    this.selecionarFilmesPorNota();
  }

  selecionarFilmesFavoritos(){
    this.listagemTipo = 'favoritos';

    if(this.historico.historicoFavoritoIDS.length == 0){
      this.filmes = []
      return;
    }

    this.filmeService.selecionarFilmesPorIds(this.historico.historicoFavoritoIDS).subscribe(filmes =>{
      this.filmes = filmes
    });
  }
  selecionarFilmesPopulares(pagina?:number) {
    pagina = pagina ? pagina : 1;
    this.paginaAtual = pagina;

    this.listagemTipo = 'populares';
    this.ehPaginado = true;

    this.filmeService.selecionarFilmesPopulares(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesPorNota(pagina?: number){
    pagina = pagina ? pagina: 1
    this.paginaAtual = pagina;
    this.listagemTipo = 'Nota'
    this.ehPaginado = true;

    this.filmeService.selecionarFilmesMelhoresAvaliados(pagina).subscribe((filmes) =>{
    this.filmes = filmes
    })
  }
  paginaSelecionada(pagina: number) {
    window.scroll(0, 0);

    if(this.listagemTipo == 'populares') {
      this.selecionarFilmesPopulares(pagina);
    }

    else if(this.listagemTipo == 'Nota') {
      this.selecionarFilmesPorNota(pagina);
    }  
}

selecionarFilmesPorTitulo(titulo?: string) {  
  this.listagemTipo = 'pesquisados';
  this.ehPaginado = false;

  if(!titulo) {
    this.filmes = [];
    return;
  }

  this.router.navigate(
    ['/busca'],
    { queryParams: { query: titulo} }
  );
}
}
