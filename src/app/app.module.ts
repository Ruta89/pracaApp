
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PracaServiceProvider } from '../providers/praca-service/praca-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//import { AuthService } from './../providers/auth-service/auth-service2';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2/angularfire2";
import { MomentModule } from 'angular2-moment';
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';

@NgModule({
  declarations: [
    MyApp,
    GalleryModal,
    ZoomableImage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GalleryModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PracaServiceProvider,
    AuthServiceProvider,
    //AuthService
  ]
})
export class AppModule { }
