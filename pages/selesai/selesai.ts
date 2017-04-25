import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { File, Camera, Transfer } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-selesai',
  templateUrl: 'selesai.html'
})
export class SelesaiPage {
  selectedItem: any;
  private imageSrc: string;
  data: any = {};

  public base64Image: string;
  //public link: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, 
   private loadingCtrl: LoadingController,public toastCtrl: ToastController, public alert: AlertController) {
    this.selectedItem = navParams.get('selectedItem'); 
    this.http = http;
    this.base64Image = "https://placehold.it/150x150";
  }

  private namaFile(){
    // var d = new Date(),
    // n = d.getTime(),
    // newFileName =  n + ".jpg";
    // return newFileName;
    var newFileName = this.selectedItem.id_tiket + ".jpg";
    return newFileName;
  }

  public takePicture() {
        let loader = this.loadingCtrl.create({
          content: "Loading..."
        });
        loader.present();

        Camera.getPicture({
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;loader.dismiss();
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));loader.dismiss();
        });
    }

 kirim(){
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    //data simpan keterangan dan nama label
    var link = 'http://192.168.43.190/pa/android/maintenance/simpan.php';
    var data = JSON.stringify({keterangan:this.data.keterangan,nama_label:this.selectedItem.nama_label,foto:this.selectedItem.id_tiket});        
    this.http.post(link, data).subscribe(
      data => { console.log(data); loader.dismiss(); }, 
      error => { console.log("Oooops!"); loader.dismiss(); }
    );
    
    //upload foto
    const fileTransfer = new Transfer();
    var options: any;  

    options = {
       fileKey: 'file',
       fileName: this.namaFile(),
       headers: {}
    }
    fileTransfer.upload(this.base64Image, "http://192.168.43.190/pa/android/maintenance/simpan.php", options)
     .then((data) => {
        let toast = this.toastCtrl.create({
          message: 'sukses',
          duration: 3000
        });toast.present();
     }, (err) => {
        let toast = this.toastCtrl.create({
          message: 'gagal : '+err,
          duration: 3000
        });toast.present();
     });

  }

  // upload(){
  //   const fileTransfer = new Transfer();
  //   var options: any;  
  //   options = {
  //      fileKey: 'file',
  //      fileName: this.base64Image+".jpg",
  //      headers: {}
  //   }
  //   fileTransfer.upload(this.base64Image, "http://192.168.43.190/android/upload.php", options)
  //    .then((data) => {
  //       let toast = this.toastCtrl.create({
  //         message: 'sukses',
  //         duration: 3000
  //       });toast.present();
  //    }, (err) => {
  //       let toast = this.toastCtrl.create({
  //         message: 'gagal : '+err,
  //         duration: 3000
  //       });toast.present();
  //    })
     
  // }

}
