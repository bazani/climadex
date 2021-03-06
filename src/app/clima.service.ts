import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

const apiKey = environment.weatherApiKey;

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  
  constructor(
    private http: HttpClient
  ) { }

  getWeather(cidade: string): any {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}`;

    return this.http.get(api);
  }
}
