import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
import { Filme } from "../models/listagem-filmes";
import { Observable, forkJoin, map } from "rxjs";
import { DetalhesFilmes } from "../models/detalhes-filmes";
import { CreditosFilme } from "../models/creditos-filmes";
import { TrailerFilme } from "../models/trailer-filmes";
import { FilmePesquisado } from "../models/filme-buscado";

@Injectable({
  providedIn: 'root', // App module
})

export class FilmeService{
  private readonly API = 'https://api.themoviedb.org/3/movie/'
  
  constructor(private http: HttpClient) {}  

  public selecionarFilmesPopulares(pagina: number): Observable<Filme[]>{
  pagina = pagina ? pagina: 1
  const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=" + pagina

   return this.http.get<any>(url,this.obterHeaderAutorizacao())
   .pipe(
    map(obj => obj.results),
    map(results => this.mapeadorFilmes(results))
   )
  }
  
  public selecionarFilmePorId(id: number): Observable<Filme>{
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`

    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => this.mapearFilme(obj))
    )
  }

  public selecionarDetalhesDoFilmePorid(id: number): Observable<DetalhesFilmes>{
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => this.mapearDetalhesFilme(obj))
    )
  }

  public selecionarCreditosFilmePorId(id: number): Observable<CreditosFilme>{
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => obj.crew),
      map(crew => this.mapearCreditosFilme(crew))
    )
  }

  public selecionarFilmesMelhoresAvaliados(pagina: number): Observable<Filme[]>{
    pagina = pagina ? pagina: 1;
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=` + pagina;
    
    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => obj.results),
      map(results => this.mapeadorFilmes(results))
    )
  }

  public selecionarFilmePesquisadoPorTitulo(titulo: string): Observable<FilmePesquisado[]>{
    const query: string  = titulo.split(' ').join('+');

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${query}&language=pt-BR&page=1`

    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => obj.results),
      map(results => this.mapearFilmesBusca(results))
    )
  }

  public selecionarFilmesPorIds(ids: number[]): Observable<Filme[]> {
    const observables = ids.map(id => this.selecionarFilmePorId(id));

    return forkJoin(observables);
  }

  public selecionarTrailerPorId(id: number): Observable<TrailerFilme>{
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

    return this.http.get<any>(url,this.obterHeaderAutorizacao())
    .pipe(
      map(obj => obj.results),
      map(results => this.mapearTrailerFilme(results))
    )
  }
  mapearTrailerFilme(results: any): TrailerFilme {
   const trailer = results[results.length - 1]?.key;

   return {
    urlTrailer: trailer == null? "" : trailer
   }
  }

  mapearCreditosFilme(crew: any[]): CreditosFilme {
    let creditos = {
      diretores: crew.filter(c => c.known_for_department == "Directing")?.map(c => c.name),
      escritores: crew.filter(c => c.known_for_department == "Writing")?.map(c => c.name),
      atores: crew.filter(c => c.known_for_department == "Acting")?.map(c => c.name)
    }

    let valores = Object.values(creditos);

    creditos.diretores = valores[0].filter((v, indice) => valores[0].indexOf(v) == indice);
    creditos.escritores = valores[1].filter((v, indice) => valores[1].indexOf(v) == indice);
    creditos.atores = valores[2].filter((v, indice) => valores[2].indexOf(v) == indice);

    return creditos;
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilmes {
    const apiGeneros: any[] = obj.genres ?? [];

   return{
    id: obj.id,
    titulo: obj.title,
    urlPoster: obj.poster_path,
    contagemVotos: obj.vote_count,
    mediaNota: Math.round(obj.vote_average * 100)/ 100,
    dataLancamento: obj.release_date,
    sinopse: obj.overview,
    generos: apiGeneros.map(g => g.name)
   }
  }

  private obterHeaderAutorizacao() {
    return {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: environment.API_TOKEN,
     },
   };
  }

  mapeadorFilmes(lista: any[]){
    return lista.map( res => this.mapearFilme(res))
  }

  private mapearFilme(obj: any): Filme{
    return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path
    }     
  }

  private mapearFilmePesquisado(obj: any): FilmePesquisado{
    return{
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path,
      data: obj.release_date,
      descricao: obj.overview
    }
  }

   mapearFilmesBusca(obj: any[]): FilmePesquisado[] {
    const filmesMapeados = obj.map(filme => this.mapearFilmePesquisado(filme));
    return filmesMapeados;
  }
  
}
