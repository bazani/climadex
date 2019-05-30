import { Component } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { ClimaService } from './clima.service';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dadosInvalidos = false;
  msgErro = '';
  nomeCidade = '';
  temperatura = '';
  isChovendo = false;
  pokemon = '';
  pokeFoto = '';

  constructor(
    private spinner: NgxSpinnerService,
    private clima: ClimaService,
    private pokedex: PokemonService
  ) {}

  pesquisar() {
    // limpa os dados para nova pesquisa
    this.spinner.show();
    this.limparDados();

    // obtem temperatura da cidade
    this.clima.getWeather(this.nomeCidade).subscribe(
      resp => {
        if (resp.cod == 200) {
          this.temperatura = resp.main.temp;
          const temp = parseInt(this.temperatura);
          
          // iterar sobre o array, se em alguma posição indicar chuva, vamos de chuva
          for (let index = 0; index < resp.weather.length; index++) {
            const weather = resp.weather[index];
            
            if (weather.main == 'Rain') {
              this.isChovendo = true;
              break;
            }
          }
          
          // pesquisa por um pokemon, seguindo as especificações
          let tipo = 'eletric';

          if (!this.isChovendo) {
            switch (true) {
              case (temp < 5):
                tipo = 'ice';
                break;
              case (temp >= 5 && temp < 10):
                  tipo = 'water';
                  break;
              case (temp >= 12 && temp < 15):
                  tipo = 'grass';
                  break;
              case (temp >= 15 && temp < 21):
                  tipo = 'ground';
                  break;
              case (temp >= 23 && temp < 27):
                  tipo = 'bug';
                  break;
              case (temp >= 27 && temp <= 33):
                  tipo = 'rock';
                  break;
              default:
                tipo = 'normal';
            }
          }
          this.getPokemonByType(tipo);
        } else {
          this.spinner.hide();
          this.dadosInvalidos = true;
          this.msgErro = 'Ocorreu um erro inesperado, tente novamente mais tarde.';
          console.error('Algo de errado, não está certo.', resp);
        }
      },
      err => {
        this.spinner.hide();
        this.dadosInvalidos = true;
        if (err.error.message === 'city not found') {
          this.msgErro = 'Cidade não encontrada, tente novamente.';
        } else {
          this.msgErro = err.error.message;
        }
      });
  }

  getPokemonByType(tipo: string) {
    this.pokedex.getPokemon(tipo).subscribe(
      resp => {
        // obtem a qte dos pokemons do tipo, para sortear um numero
        const amostras = resp.pokemon.length;
        let sorteio = 0;
        sorteio = Math.floor((Math.random() * amostras));

        console.log('numero da sorte', sorteio);
        console.log('pokemon sorteado', resp.pokemon[sorteio]);

        /* for (let index = 0; index < resp.pokemon.length; index++) {
          const element = resp.pokemon[index];
        } */

        // verifica se o pokemon já foi exibido, para evitar repetições

        // mostra o nome do pokemon
        this.pokemon = resp.pokemon[sorteio].pokemon.name;
        // mostra imagem do pokemon
        this.getPokemonImage(resp.pokemon[sorteio].pokemon.url);
      },
      err => {
        this.spinner.hide();
        this.dadosInvalidos = true;
        if (err.error.message === 'city not found') {
          this.msgErro = 'Cidade não encontrada, tente novamente.';
        } else {
          this.msgErro = err.error.message;
        }
      }
    );
  }

  getPokemonImage(pokeUrl: string) {
    this.pokedex.getPokemonImage(pokeUrl).subscribe(
      resp => {
        this.pokeFoto = resp.sprites.front_default;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.dadosInvalidos = true;
        this.msgErro = err.error.message;
      }
    );
  }

  limparDados() {
    this.dadosInvalidos = false;
    this.temperatura = '';
    this.isChovendo = false;
    this.pokemon = '';
    this.pokeFoto = '';
  }
}
