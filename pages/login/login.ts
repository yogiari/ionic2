import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
//import { File, Camera, Transfer } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Page1 } from '../page1/page1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  data: any = {};
  post: String;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,
    private http:Http, public alert: AlertController, private loadingCtrl: LoadingController) {
  }

  session(key){
    this.storage.set('nama', key);
  }

  login(){  
    let a = this.http.get("http://192.168.43.190/pa/android/maintenance/login.php?user=" + this.data.username + "&pass=" + this.data.password + "")
    .map(res => res.json()).subscribe(data => {
        this.post = data.data;
        console.log(this.post);
        //cek jika usrname pwd sesuai
        if(Object.keys(this.post).length === 1){
          this.session(this.data.username);
          //loading
          let loader = this.loadingCtrl.create({
            content: "Loading..."
          });
          loader.present();
          //set page ke hal 1
          this.navCtrl.setRoot(Page1);
          //loading selesai
          loader.dismiss();
        }else {
          let alert = this.alert.create({
            title:"username atau pasword salah",
            buttons: ['OK']
          });alert.present();
          this.navCtrl.setRoot(LoginPage);
          console.log('gagal');
        }
    });
  }
}
