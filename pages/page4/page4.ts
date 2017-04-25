import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})
export class Page4 {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {}

  sessionEnd() {
    this.storage.remove('nama');
    this.navCtrl.setRoot(LoginPage);
  }

}
