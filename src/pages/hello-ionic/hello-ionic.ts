import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { MusicPage } from '../music/music';


@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {

  }

  goToMusicPage(audio){
    this.navCtrl.push(MusicPage, {audio});
  }
}
