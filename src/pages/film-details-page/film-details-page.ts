import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-film-details-page',
  templateUrl: 'film-details-page.html'
})
export class FilmDetailsPage {

  film: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.film = this.navParams.get('film');
  }

}
