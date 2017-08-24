import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

import cheerio from 'cheerio';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {

  apiRoot: string = 'https://itunes.apple.com/search';

  constructor(private jsonp: Jsonp, private http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  getFilms() {
    return this.http.get('http://swapi.co/api/films').map(res => res.json());
  }

  getTracks(term:string) {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL).map(res => res.json());
  }

}
