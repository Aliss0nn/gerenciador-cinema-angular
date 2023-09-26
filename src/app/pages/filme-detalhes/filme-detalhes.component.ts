import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CreditosFilme } from 'src/app/models/creditos-filmes';
import { DetalhesFilmes } from 'src/app/models/detalhes-filmes';
import { Historico } from 'src/app/models/historico';
import { TrailerFilme } from 'src/app/models/trailer-filmes';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';



@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.component.html',
  styleUrls: ['./filme-detalhes.component.css']
})
export class FilmeDetalhesComponent implements OnInit {
urlSegura: SafeResourceUrl = '';
filmeDetalhes: DetalhesFilmes;
filmeTrailer: TrailerFilme;
filmeCreditos: CreditosFilme;
imagem_url: string;
video_url: string;
ehFavorito: boolean;
historico: Historico;

constructor(
  private toastService: ToastrService,
  private localStorageService: LocalStorageService,
  private FilmeService: FilmeService,
  private route: ActivatedRoute,
  private sanatizer: DomSanitizer
){
  this.filmeDetalhes = {
    id: 0,
    titulo: '',
    urlPoster: '',
    contagemVotos: 0,
    mediaNota: 0,
    dataLancamento: '',
    sinopse: '',
    generos: []
  };

  this.filmeTrailer ={
    urlTrailer: ''
  };

  this.filmeCreditos = {
    diretores: [],
    escritores: [],
    atores: [],
  };

  this.historico = new Historico([]);

  this.imagem_url = "";
  this.video_url = "";
  this.ehFavorito = false;
}
  ngOnInit(): void {
  this.historico = this.localStorageService.carregarDados();

  const id = parseInt(this.route.snapshot.paramMap.get('id')!);

  this.FilmeService.selecionarDetalhesDoFilmePorid(id).subscribe(FilmeDetalhes =>{
    this.filmeDetalhes = FilmeDetalhes;
    this.imagem_url = `https://image.tmdb.org/t/p/original${this.filmeDetalhes.urlPoster}`;
    this.ehFavorito = this.historico.historicoFavoritoIDS.includes(this.filmeDetalhes.id);

  });

  this.FilmeService.selecionarTrailerPorId(id).subscribe(filmeTrailer => {
    this.filmeTrailer = filmeTrailer;
    this.video_url = `https://www.youtube.com/embed/${this.filmeTrailer.urlTrailer}/`;
  });

  this.FilmeService.selecionarCreditosFilmePorId(id).subscribe(filmeCreditos => {
    this.filmeCreditos = filmeCreditos;
  });
  }

  formatarListaCreditos(lista: string[]): string {
    return lista.map((c, i) => i == 0 ? c : ' º ' + c ).join('');
  }

  atualizarFavoritos(): void {
    if(this.historico.historicoFavoritoIDS.includes(this.filmeDetalhes.id)) {
      this.toastService.success('Filme retirado da lista de favoritos', 'Success');
      this.historico.historicoFavoritoIDS = this.historico.historicoFavoritoIDS
        .filter(f => f != this.filmeDetalhes.id);
        this.ehFavorito = false;
    }

    else {
      this.toastService.success('Filme adicionado a lista de favoritos', 'Success');
      this.historico.historicoFavoritoIDS.push(this.filmeDetalhes.id);
      this.ehFavorito = true;
    }

    this.localStorageService.salvarDados(this.historico);
  }
}
