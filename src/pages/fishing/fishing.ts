import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { IonicPage } from 'ionic-angular';

import { ApiNativeProvider } from './../../providers/api-native/api-native';

import { Observable } from 'rxjs/Observable';




@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'fishing.html'
})
export class FishingPage {
  icons: string[];
  items: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiNativeProvider) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = this.apiProvider.getHotSpots();
    // this.items = [];
    // for(let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
    this.navCtrl.push('ItemDetailsPage', {
      item: item
    });
  }
}
