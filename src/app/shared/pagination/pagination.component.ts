import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
@Input() page: number;

@Output() onPaginaSelecionada: EventEmitter<number>

constructor() {
  this.onPaginaSelecionada = new EventEmitter();
  this.page = 1;
}

paginaSelecionada(pagina: number): void {
  this.onPaginaSelecionada.emit(pagina);
  console.log(pagina)
}
}