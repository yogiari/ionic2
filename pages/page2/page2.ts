import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Page3 } from '../page3/page3';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  posts: any;
  user: String;

  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtrl: LoadingController) {
        //session
      this.storage.get('nama').then((val) => {
          //this.user = val;
        // loader    
        let loader = this.loadingCtrl.create({
          content: "Loading..."
        });
        loader.present();
        //http get
        let json = this.http.get('http://192.168.43.190/pa/android/maintenance/select.php?user=' + val +'').map(res => res.json())
        .subscribe(
          data => {
            this.posts = data.data;
            loader.dismiss();
          }, 
          err => {
            console.log("oopsss");
            loader.dismiss();
          });
          //  console.log(json);
        });

  }

  itemTapped(event,post) {
    this.navCtrl.push(Page3,{post:post});
  }
}
