import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/auth';
@Injectable()
export class AuthServiceProvider {

  authState: any = null;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
 
    this.afAuth.authState.subscribe((auth) => {
      this.authState  = auth;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  //Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anymous user
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display namer or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }




  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  // Sign Out
  signOut(): void {
    this.afAuth.auth.signOut();
    //this.navCtrl.push(LoginPage)
  }

  // Helpers
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    let path = `user/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  // getUser():firebase.User {
  //   return this.fireAuth;
  // }

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




  // loginUser(email: string, password: string): firebase.Promise<any> {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
  //     console.log("OK Login email ", email);
  //   }).catch((error) => {
  //     console.log("login user failed");
  //     console.log(error.message);
  //   });
  // }


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


  // resetPassword(email: string): firebase.Promise<any> {
  //   return firebase.auth().sendPasswordResetEmail(email);
  // }

  // // logoutUser(): firebase.Promise<any> {
  // //   return this.af.auth.logout();
  // // }

  // signOut(): firebase.Promise<any> {
  //   return this.afAuth.auth.signOut();
  // }

  // displayName(): string {
  //   if (this.currentUser !== null) {
  //     return this.currentUser.displayName;
  //   } else {
  //     return '';
  //   }
  // }


  // signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  // }

}
