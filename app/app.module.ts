import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Page4 } from '../pages/page4/page4';
import { MapPage } from '../pages/map/map';
import { SelesaiPage } from '../pages/selesai/selesai';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';

import { ConnectivityService } from '../providers/connectivity-service';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Page4,
    MapPage,
    SelesaiPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Page4,
    MapPage,
    SelesaiPage,
    LoginPage
  ],
  providers: [Storage,ConnectivityService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
