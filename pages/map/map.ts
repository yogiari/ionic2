import { Component,ElementRef, ViewChild  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Page3 } from '../page3/page3';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyC26jTbusb3apCyzxodwo8btyjasPCmevE';
  // koordinat: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,public connectivityService: ConnectivityService ) {
    	this.loadGoogleMaps();
	}

	loadGoogleMaps(){
	    this.addConnectivityListeners();
		  if(typeof google == "undefined" || typeof google.maps == "undefined"){
		    console.log("Google maps JavaScript needs to be loaded.");
		    this.disableMap();
		    if(this.connectivityService.isOnline()){
		      console.log("online, loading map");	 
		      //Load the SDK
		      window['mapInit'] = () => {
		        this.initMap();
		        this.enableMap();
		      }
		 
		      let script = document.createElement("script");
		      script.id = "googleMaps";
		 
		      if(this.apiKey){
		        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
		      } else {
		        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
		      }
		      document.body.appendChild(script);  
		    } 
		  }
		 else {
		    if(this.connectivityService.isOnline()){
		      console.log("showing map");
		      this.initMap();
		      this.enableMap();
		    }
		    else {
		      console.log("disabling map");
		      this.disableMap();
		    }
		}
	}

	initMap(){
	    this.mapInitialised = true;
		  
      let a = this.navParams.get('a');
			let b = this.navParams.get('b');
      let latLng = new google.maps.LatLng(a,b);
			let mapOptions = {
		        center: latLng,
		        zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		      } 
		  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			// this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			//marker
			let marker = new google.maps.Marker({
				position: latLng,
				map: this.map,
				title: "lokasi"
			});	
			// this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			console.log(a,b);
	}
		
	disableMap(){
	    console.log("disable map");
	}
		 
	enableMap(){
	    console.log("enable map");
	}
		 
	addConnectivityListeners(){ 
		    let onOnline = () => {
		      setTimeout(() => {
		        if(typeof google == "undefined" || typeof google.maps == "undefined"){ 
		          this.loadGoogleMaps();
		        } else {
		          if(!this.mapInitialised){
		            this.initMap();
		          }
		          this.enableMap();
		        }
		      }, 2000);
		    };
		    let onOffline = () => {
		      this.disableMap();
		    };
		 
		    document.addEventListener('online', onOnline, false);
		    document.addEventListener('offline', onOffline, false);	 
	}

}
