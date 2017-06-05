import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  displayName: any;
  dateNow: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    this.displayName = this.authService.currentUserDisplayName;
    this.dateNow = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
