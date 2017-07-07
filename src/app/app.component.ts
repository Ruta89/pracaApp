import { AuthServiceProvider } from './../providers/auth-service/auth-service';

import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import * as firebase from 'firebase/auth';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userId: any;
  pages: Array<{ title: string, component: any }>;
  currentUser
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth, public authService: AuthServiceProvider) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user.uid;
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'LoginPage';
      }
    });


    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Praca', component: 'PracaPage' },
      { title: 'Waga', component: 'GalleryPage' },
	  { title: 'Naddatki', component: 'PhotoNPage' }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


}

