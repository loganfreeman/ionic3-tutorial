import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { IonicPage } from 'ionic-angular';

import { ApiNativeProvider } from './../../providers/api-native/api-native';

import { Observable } from 'rxjs/Observable';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'fishing.html'
})
export class FishingPage {
  options : GeolocationOptions;
  items: Observable<any>;
  originalItems: Observable<any>;
  currentPos: Observable<Geoposition>;
  distance: number;
  keyword: string;
  loading: Loading  = this.loadingCtrl.create({
    spinner: 'hide',
    content: 'Loading Please Wait...'
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiNativeProvider, public loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator, private geolocation : Geolocation) {
    this.items = this.apiProvider.getHotSpots();

    this.originalItems = this.items;

    this.items.subscribe(response=>{
      this.loading.dismiss();
    });

    this.presentLoadingText();
  }

  ionViewDidEnter(){
      //this.getUserPosition();
      //this.loadMap();
      this.currentPos = this.getUserPosition();
  }

  getUserPosition() {
    this.options = {
        enableHighAccuracy : true
    };
    let promise = this.geolocation.getCurrentPosition(this.options);
    return Observable.fromPromise(promise);
  }

  navigate(latitude, longitude) {
    console.log(latitude, longitude);
    this.launchNavigator.navigate([latitude, longitude]);
  }

  setFilter() {
    //console.log(this.keyword);
    if(this.keyword.trim().length === 0) {
      return this.items = this.originalItems;
    }
    let reg;
    try {
      reg = new RegExp(this.keyword, 'i');
    }catch(e) {
      return this.items = this.originalItems;
    }
    return this.items = this.originalItems
         .map(items => items.filter(item => {
           return item.title.match(reg);
         }));
  }

  onStatusChange(status) {
    if(status === 'All') {
      return this.items = this.originalItems;
    }
    return this.items = this.originalItems
         .map(items => items.filter(item => {
           return item.status === status;
         }));
  }

  presentLoadingText() {
    this.loading.present();
  }

  itemTapped(event, item) {
    this.navCtrl.push('ItemDetailsPage', {
      item: item
    });
  }
}
