import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = '9fdcdd7058e816af7050045cea29df1c';

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
