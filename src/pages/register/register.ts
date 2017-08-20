import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  }

  register(user: User){
    this.authService.emailSignUp(user.email, user.password).then(()=>{
      
    }).catch((err)=>{
      alert(err);
    })
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
