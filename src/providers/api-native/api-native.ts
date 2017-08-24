import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';




import cheerio from 'cheerio';


function findTextAndReturnRemainder(target, variable) {
  let index = target.search(variable);
  if(index == -1) {
    return null;
  }
  let chopFront = target.substring(index + variable.length, target.length);
  let result = chopFront.substring(0, chopFront.search(";"));
  return result;
}

function getWaterBody(text,waterbodies = []) {
  if (!text) {
    return;
  }
  let findAndClean = findTextAndReturnRemainder(text, "var waterbody =")
  if (findAndClean) {
    var result = eval(findAndClean);

    result.forEach((waterbody) => {
      //let url = `https://wildlife.utah.gov/hotspots/detailed.php?id=${waterbody[3]}`;
      waterbodies.push({
        title: waterbody[0],
        longitude: waterbody[1],
        latitude: waterbody[2],
        status: waterbody[4],
        kind: waterbody[5],
        link: waterbody[6]
      });
    })
  }
  return waterbodies;
}

/*
  Generated class for the ApiNativeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiNativeProvider {

  utahFishingRoot: string = "https://wildlife.utah.gov/hotspots/";


  constructor(public http: HTTP) {
    console.log('Hello ApiNativeProvider Provider');
  }

  getHotSpots() {
    let promise = this.http.get(this.utahFishingRoot, {}, {}).then(raw => raw.data).then(html => {
      let $ = cheerio.load(html);
      let waterbodies = [];
      $('script').each((index, element) => {
        getWaterBody($(element).html(), waterbodies);
      });
      return waterbodies;
    });

    return Observable.fromPromise(promise);
  }

}
