import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-filme',
  templateUrl: './buscar-filme.component.html',
  styleUrls: ['./buscar-filme.component.css']
})
export class BuscarFilmeComponent {
  @Output() onTituloSelecionado: EventEmitter<string>;
  titulo: string;

  constructor() {
    this.titulo = '';
    this.onTituloSelecionado = new EventEmitter();
  }

  filmePesquisado(): void {
    this.onTituloSelecionado.emit(this.titulo);
    this.titulo = '';
  }
}
