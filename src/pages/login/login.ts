//import { AuthService } from '../../providers/auth-service/auth-service2';

import { User } from '../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor( private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  // login(email: string, passowrd: string) {
  //   this.authService.emailLogin(email, passowrd)
  //   .then(()=>{
  //     this.navCtrl.push('PracaPage')
  //   }) 
  // }

  async login(user: User) {
    try {
      // czy tu niepowinno byc awit?
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.navCtrl.setRoot('PracaPage');
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

// import { User } from '../../models/user';
// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';

// @IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {

//   user = {} as User;

//   constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
//   }

//   async login(user: User) {
//     try {
//       // czy tu niepowinno byc awit?
//       const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
//       console.log(result);
//       if(result){
//         this.navCtrl.setRoot('PracaPage');
//       }
//     }
//     catch(e){
//       console.error(e);
//     }
//   }

//   register() {
//     this.navCtrl.push('RegisterPage');
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }

// }
