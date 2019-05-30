import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dadosInvalidos = false;
  nomeCidade = '';

  pesquisar() {
    
    console.log('ueeeeee', this.nomeCidade);
  }
}
