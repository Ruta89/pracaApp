
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { PracaServiceProvider } from '../providers/praca-service/praca-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { MomentModule } from 'angular2-moment';
import * as ionicGalleryModal from 'ionic-gallery-modal';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MomentModule,
    ReactiveFormsModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {  provide: HAMMER_GESTURE_CONFIG,  useClass: ionicGalleryModal.GalleryModalHammerConfig },
    PracaServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule { }
