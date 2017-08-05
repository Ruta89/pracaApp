
// import { AuthServiceProvider } from '../auth-service/auth-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase/app';
//import moment from 'moment';

@Injectable()
export class PracaServiceProvider {
  user: firebase.User;
  authState: Observable<firebase.User>;

  naddatek: any;
  maszyna: any;
  keyS: any;

  currentUser: any;

  wll: any;
  l1: number;
  m: any;
  nici: any;
  auf: any;
  ilosc: any;
  czas: any;
  listaPozycji: FirebaseListObservable<any[]>;
  photos: FirebaseListObservable<any[]>;
  data: any;
  pozycje: FirebaseListObservable<any>;
  naddatki: FirebaseListObservable<any>;
  pozycjaDetail: FirebaseObjectObservable<any>;
  pozycjaId: any;
  id: any;
  p: any;
  pf: any;
  date: any;
  uid: any;
  userId: any;
  auth: any;
  mojNaddatek: any;
  naddatekDetail: any;
  idPozycji: any;
  idN: any;
  itemsN: any;
  naddatekP: any;
  dataN: any;
  formProd: FirebaseListObservable<any>;
  formProd2: FirebaseObjectObservable<any>;
  formProd3: FirebaseListObservable<any[]>;
  fireTimestamp: any;
  robota: Array<any>;
  robot;
  pozycjeArr: any;
  endT: number;
  wartoscArr = [];
  wartoscArr2 = [];
  viceroy =   firebase.database().ref('/listaPozycji');
  constructor(
    private afAuth: AngularFireAuth,
    public afd: AngularFireDatabase,
    public http: Http
  ) {
    console.log('Hello Praca Provider');
    this.authState = this.afAuth.authState;

 

  }

  savePhoto(imageData){
  return this.afd
      .list('/photos').push({
        imageData: imageData
      });
  }

  getPhotos(){
return  this.afd
      .list('/photos');
  }

  getProdukcje() {
    return (this.pozycje = this.afd
      .list('/userProfile/' + this.user.uid + '/listaPozycji', {
        query: {
          limitToLast: 24
        }
      })
      .map(array => array.reverse()) as FirebaseListObservable<any[]>);
  }

  getPozycja(id: string): FirebaseObjectObservable<any> {
    return (this.pozycjaDetail = this.afd.object(
      '/userProfile/' + this.userId + '/listaPozycji' + id
    ));
  }

  wyswietlPozycje(): FirebaseListObservable<any> {
    return this.afd
      .list('/listaPozycji', {
        query: {
          orderByChild: 'fireTimestamp'
        }
      })
      .map(array => array.reverse()) as FirebaseListObservable<any[]>;
  }



  wyswietlNaddatki(): FirebaseListObservable<any> {
    return this.afd.list('/listaNaddatkow');
  }

  getPozycje() {
    //11111111111111111
    //   console.log('getPozycje');
    // return (this.pozycje = this.afd.list('/userProfile/' + this.user.uid + '/listaPozycji', {
    //     query: {
    //       limitToLast: 24
    //     }
    //   })
    //   .map(array => array.reverse()) as FirebaseListObservable<any[]>);

    // 2222222222222222
    return this.afd
      .list('/userProfile/' + this.user.uid + '/listaPozycji', {
        query: {
          limitToLast: 24
        }
      })
      .map(array => array.reverse());
  }
  getNaddatki() {
    return this.naddatki;
  }
  getNaddatek(id: string) {
    return (this.naddatekDetail = this.afd.object(
      '/userProfile/' + this.userId + '/naddatki' + id
    ));
  }
  // pokaPozycje(): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //         firebase.database().ref('/userProfile')
  //             .child(firebase.auth().currentUser.uid)
  //             .on('value', data => {
  //                 resolve(data.val());
  //             });
  //     });
  // }

  // get GetListaPozycji() {
  //     return this.pozycje;
  // }


  savePozycja(data) {
    return this.afd.list('/listaPozycji').push({
      wll: data.wll,
      l1: data.l1,
      m: data.m,
      nici: data.nici,
      auf: data.auf,
      ilosc: data.ilosc,
      czas: data.czas,
      date: new Date(),
      fireTimestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  addNoteServ(keyS, data) {
    return this.afd.object('/listaPozycji/' + keyS).update({
      note: data.note
    });
  }

  addNaddDetailS(keyS, data, dataN) {
    return this.afd.list('/listaNaddatkow').push({
      wll: data.wll,
      l1: data.l1,
      maszyna: dataN.maszyna,
      mojNaddatek: dataN.mojNaddatek,
      notatka: dataN.notatka,
      idPozycji: keyS,
      fireTimestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  updateNadPoz(keyS, data, dataN) {
    return this.afd.object('/listaPozycji/' + keyS).update({
      maszyna: dataN.maszyna,
      mojNaddatek: dataN.mojNaddatek,
      notatka: dataN.notatka,
      updateDate: firebase.database.ServerValue.TIMESTAMP
    });
  }

  updatePozycja(id, data) {
    return this.afd.object('/listaPozycji/' + id).update({
      wll: data.wll,
      l1: data.l1,
      m: data.m,
      nici: data.nici,
      auf: data.auf,
      ilosc: data.ilosc,
      czas: data.czas,
      updateDate: firebase.database.ServerValue.TIMESTAMP
    });
  }

  //   zapiszPozycje(wll, l1, m, nici, auf, ilosc) {
  //     this.pozycje
  //       .push({
  //         wll: wll,
  //         l1: l1,
  //         m: m,
  //         nici: nici,
  //         auf: auf,
  //         ilosc: ilosc,
  //         date: new Date().toISOString()
  //         //timestamp: new Date().toISOString()
  //       })
  //       .then(
  //         nowaPozycja => {
  //           //console.log('Zapisana pozycja' + wll, l1, m, nici, auf, ilosc);
  //           console.log('modal dodaj pozycje: nowaPozycja  ' + nowaPozycja);
  //           //this.navCtrl.push('PracaPage');
  //         },
  //         error => {
  //           console.log('zapiszPozycje()  ' + error);
  //         }
  //       );
  //   }

  //tonaz: number, dlugosc: number, maszyna: string, naddatek: number, timestamp: string
  zapiszNaddatek(data) {
    return this.afd.list('/listaNaddatkow').push({
      wll: data.wll,
      l1: data.l1,
      maszyna: data.maszyna,
      mojNaddatek: data.mojNaddatek,
      updateDate: firebase.database.ServerValue.TIMESTAMP
    });
  }

  //detailPage
  zapiszNad(id, wll, l1, data) {
    this.afd
      .list('userProfile/' + this.userId + '/naddatki/')
      .push({
        idPoz: id,
        wll: wll,
        l1: l1,
        maszyna: data.maszyna,
        mojNaddatek: data.mojNaddatek,
        timestamp: new Date().toISOString()
      })
      .then(data => {
        console.log('praca service zapiszNad  wll  ' + wll);
      })
      .catch(error => {
        console.log(
          'praca service, metoda addNaddatek .catch((error) => {  ' + error
        );
      });
  }

  updateNaddatek(id, data) {
    return this.afd.list('/listaNaddatkow/').update(id, {
      wll: data.wll,
      l1: data.l1,
      maszyna: data.maszyna,
      mojNaddatek: data.mojNaddatek
    });
  }

  removeNaddatek(naddatekId) {
    return this.afd.list('/listaNaddatkow/').remove(naddatekId);
  }

  usunPozycje(id) {
    return this.afd.list('/listaPozycji').remove(id);
  }

  saveFormProd(value) {
    this.formProd.push(value).then(
      data => {
        console.log('saveFormProd  ' + data);
      },
      error => {
        console.log('error saveFormProd  ' + error);
      }
    );
  }

  savePracaAdd(value) {
    console.log('value  ', value);
    this.pozycje
      .push(value)
      .then(
        data => {
          console.log('savePracaAdd  ', data);
        },
        error => {
          console.log('error savePracaAdd  ', error);
        }
      )
      .catch(err => {
        alert(err);
      });
  }

  updateProd(id, data) {
    console.log('updateProd jest id? ', id);
    console.log('updateProd jest data? ', data);

    console.log('this.formProd', this.formProd);
    this.formProd.update(id, {
      wll: data.wll,
      l1: data.l1,
      licznik: data.licznik,
      nici: {
        [0]: {
          ilosc: data.ilosc,
          partia: data.partia
        }
      },
      // nici: data.nici[0].ilosc,
      // partia: data.partia,
      auf: data.auf,
      szt: data.szt
    });
  }

  updateProd2(id, data) {
    console.log('updateProd2 jest id? ', this.id);
    console.log('updateProd2 jest this.data? ', this.data);

    // console.log('this.formProd', this.moda);
    this.formProd3.update(this.id, {
      wll: data.wll,
      l1: data.l1,
      licznik: data.licznik,
      nici: {
        [0]: {
          ilosc: data.ilosc,
          partia: data.partia
        }
      },
      // nici: data.nici[0].ilosc,
      // partia: data.partia,
      auf: data.auf,
      szt: data.szt
    });
  }
  updateProd3(id, data) {
    console.log('updateProd3 jest id? ' + id);

    this.formProd
      .update(id, {
        wll: data.wll,
        l1: data.l1,
        licznik: data.licznik,
        // nici: data.nici,
        auf: data.auf,
        ilosc: data.ilosc
      })
      .then(
        data => {
          console.log('saveFormProd data ', data);
          // console.log("saveFormProd  data.wll ", data.wll);
          console.log('saveFormProd id ', id);
        },
        error => {
          console.log('error saveFormProd  ' + error);
        }
      );
  }

  // }).then(data => {
  //     console.log("saveFormProd data ", data);
  //     // console.log("saveFormProd  data.wll ", data.wll);
  //     console.log("saveFormProd id ", id);
  // }, error => {
  //     console.log("error saveFormProd  " + error);
  // });
  // }
}
