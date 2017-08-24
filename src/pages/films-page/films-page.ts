import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Jsonp, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-films-page',
  templateUrl: 'films-page.html',
})
export class FilmsPage {
  films: Observable<any>;
  //apiRoot: string = "http://swapi.co/api/films";
  //
  apiRoot: string = 'https://itunes.apple.com/search';

  constructor(public navCtrl: NavController, private jsonp: Jsonp, private http: Http) {
    //let apiURL:string = `${this.apiRoot}?callback=JSONP_CALLBACK`;
    let term:string = "love";
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
    // this.films = this.http.get('http://swapi.co/api/films').map(res => res.json());
    // this.films = this.jsonp.request('http://swapi.co/api/films?callback=JSONP_CALLBACK').map(res => res.json());
    this.films = this.jsonp.request(apiURL).map(res => res.json());
  }

  openDetails(film) {
    this.navCtrl.push('FilmDetailsPage', {film: film});
  }
}
