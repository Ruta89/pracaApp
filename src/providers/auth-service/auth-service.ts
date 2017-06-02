import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/auth';
import { Platform } from 'ionic-angular';
@Injectable()
export class AuthServiceProvider {

  //private authState: Observable<firebase.User>;
  //public currentUser: firebase.User;
  user: any;
  userId: any;
  getUserID: any;
  userF: any;
  currentUser: any;
  constructor(public afAuth: AngularFireAuth, public platform: Platform) {
    // this.afAuth.authState.subscribe((user) => {


    //   //this.userF = firebase.User.uid;


    // });
    afAuth.authState.subscribe((user) => {
      this.currentUser = user.uid;
      console.log("this.currentuser w AuthServiceProvider " + this.currentUser);
      //this.userF = firebase.User.uid;
    });
  }

  // getUser():firebase.User {
  //   return this.fireAuth;
  // }


  get authenticated(): boolean {
    return this.currentUser !== null;
  }
  // userIdd(){
  //    return console.log("gy");
  // }


  // signInWithFacebook(): firebase.Promise<any> {
  //   if (this.platform.is('cordova')) {
  //     return this.facebook.login(['email', 'public_profile']).then(res => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //       return this.afAuth.auth.signInWithCredential(facebookCredential);
  //     });
  //   } else {
  //     return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  //   }
  // }




  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log("OK Login email ", email);
    }).catch((error) => {
      console.log("login user failed");
      console.log(error.message);
    });
  }


  // anonymousLogin(): firebase.Promise<FirebaseAuthState> {
  //   return this.af.auth.login({
  //     provider: AuthProviders.Anonymous,
  //     method: AuthMethods.Anonymous
  //   });
  // }




  // linkAccount(email: string, password: string): firebase.Promise<any> {
  //   const userProfile = firebase.database().ref('/userProfile');
  //   const credential = firebase.auth.EmailAuthProvider.credential(email, password);

  //   return firebase.auth().currentUser.link(credential).then(user => {
  //     userProfile.child(user.uid).update({
  //       email: email
  //     });
  //   }, error => {
  //     console.log("There was an error linking the account", error);
  //   });
  // }


  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // logoutUser(): firebase.Promise<any> {
  //   return this.af.auth.logout();
  // }

  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  displayName(): string {
    if (this.currentUser !== null) {
      return this.currentUser.displayName;
    } else {
      return '';
    }
  }


  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

}
