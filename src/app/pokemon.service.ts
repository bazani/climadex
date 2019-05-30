import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemon(tipo: string): any {
    return this.http.get(`https://pokeapi.co/api/v2/type/${tipo}`);
  }

  getPokemonImage(url: string): any {
    return this.http.get(url);
  }
}
