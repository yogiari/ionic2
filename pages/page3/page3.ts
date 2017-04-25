import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SelesaiPage } from '../selesai/selesai';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('post');  
    
  }

  map(lat,lon){
    this.navCtrl.push(MapPage,{a:lat,b:lon});
    // console.log(lat,lon);
  }

  selesai(selectedItem){
    this.navCtrl.push(SelesaiPage,{selectedItem:selectedItem});
  }

}
