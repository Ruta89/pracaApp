import { Observable } from 'rxjs/Observable';
import { PracaServiceProvider } from './../providers/praca-service/praca-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string; component: any }>;
  user: Observable<  {
    email: string;
    password: string;
}>;
  constructor(
    platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    pracaService: PracaServiceProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      pracaService.authState.subscribe(user => {
        if (user) {
          this.rootPage = 'PracaPage';
        } else {
          this.rootPage = 'LoginPage';
        }
      });

      this.pages = [
        { title: 'Home', component: 'HomePage' },
        { title: 'Praca', component: 'PracaPage' },
        { title: 'Zdjecia', component: 'TakePhotoPage' },
        { title: 'Waga', component: 'GalleryPage' },
        { title: 'Naddatki', component: 'PhotoNPage' }
      ];
      
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
