import { Injectable } from "@angular/core";
import { Historico } from "../models/historico";

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService{

  constructor(){

  }

  private endereco: string = 'gerenciador_cinema';

  salvarDados(dados: Historico): void {
    const jsonString = JSON.stringify(dados);

    localStorage.setItem(this.endereco,jsonString)
  }

  carregarDados(){
    const dadosJson = localStorage.getItem(this.endereco);

    if(dadosJson)
    return JSON.parse(dadosJson) as Historico;

    return new Historico([]);
  }
}