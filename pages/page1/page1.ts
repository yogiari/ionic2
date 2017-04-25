import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  user: any;

  constructor(public navCtrl: NavController, public storage:Storage) {
     this.storage.get('nama').then((val) => {
        this.user = val;
     })
  }

}
