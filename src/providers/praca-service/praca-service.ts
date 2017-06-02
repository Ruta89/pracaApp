
//import { AuthService } from './../auth-service/auth-service2';
import { AuthServiceProvider } from './../auth-service/auth-service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/auth';
import moment from 'moment';

@Injectable()
export class PracaServiceProvider {
    naddatek: any;
    maszyna: any;
    keyS: any;

    naddatki: FirebaseListObservable<any[]>;
    currentUser: any;

    wll: any;
    l1: number;
    m: any;
    nici: any;
    auf: any;
    ilosc: any;
    listaPozycji: FirebaseListObservable<any[]>;
    data: any;
    pozycje: FirebaseListObservable<any>;
    pozycjaDetail: FirebaseObjectObservable<any>;
    pozycjaId: any;
    id: any;
    p: any;
    pf: any;
    date: any;
    uid: any;
    dzisiaj: any;
    authState: any = null;
    user: any;

    constructor(public afAuth: AngularFireAuth, public http: Http, public afDb: AngularFireDatabase, private aauth: AuthServiceProvider) {

        //this.user = this.afAuth.authState
        // ponizej wywala blad ze nie ma uid
        this.currentUser = this.afAuth.auth.currentUser.uid;
        console.log("this.currentUser musi byc -------------------------------------   ", this.currentUser);
        this.dzisiaj = Date.now();
        this.pozycje = afDb.list('/userProfile/' + this.currentUser + '/listaPozycji', {
            query: {
                limitToLast: 24
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        this.naddatki = afDb.list(`userProfile/${this.currentUser}/naddatki`);
    }

    // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }


    // getPozycja(pozycjaId: string): FirebaseObjectObservable<any> {
    //     return this.pozycjaDetail = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + pozycjaId);
    // }

    getPozycja(id: string): FirebaseObjectObservable<any> {
        return this.pozycjaDetail = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji' + id);
    }

    getPozycje() {
        //return this.afDb.list('/userProfile/' + this.currentUser + '/listaPozycji/');
        return this.pozycje;

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

    get GetNaddatki() {
        return this.naddatki;
    }

    savePozycja(wll, l1, m, nici, auf, ilosc) {
        this.pozycje.push({
            wll: wll,
            l1: l1,
            m: m,
            nici: nici,
            auf: auf,
            ilosc: ilosc,
            //date: new Date().toISOString()
            date: moment().format()
        });
    }

    zapiszPozycje(wll, l1, m, nici, auf, ilosc) {
        this.pozycje.push({
            wll: wll,
            l1: l1,
            m: m,
            nici: nici,
            auf: auf,
            ilosc: ilosc,
            date: new Date().toISOString()
        }).then(nowaPozycja => {
            //console.log('Zapisana pozycja' + wll, l1, m, nici, auf, ilosc);
            console.log("modal dodaj pozycje: nowaPozycja  " + nowaPozycja);
            //this.navCtrl.push('PracaPage');
        }, error => {
            console.log("zapiszPozycje()  " + error);
        });
    }


    //tonaz: number, dlugosc: number, maszyna: string, naddatek: number, timestamp: string
    zapiszNaddatek(data) {
        this.naddatki.push({
            tonaz: data.tonaz,
            dlugosc: data.dlugosc,
            maszyna: data.maszyna,
            naddatek: data.naddatek,
            timestamp: new Date().toISOString()
        }).then((data) => {
            console.log("praca service.then((data) => {  " + data);
        }).catch((error) => {
            console.log("praca service, metoda addNaddatek .catch((error) => {  " + error);
        });
    }

    //detailPage
    zapiszNad(id, wll, l1, data) {

        this.afDb.list('userProfile/' + this.currentUser + '/naddatki/' + id).push({
            wll: wll,
            l1: l1,
            maszyna: data.maszyna,
            naddatek: data.naddatek,
            timestamp: new Date().toISOString()
        }).then((data) => {
            console.log("praca service.then((data) => {  " + wll);
        }).catch((error) => {
            console.log("praca service, metoda addNaddatek .catch((error) => {  " + error);
        });
    }

    updateNaddatek(data) {                     // badz this.
        this.naddatki.update(data.naddatekId, {
            tonaz: data.tonaz,
            dlugosc: data.dlugosc,
            maszyna: data.maszyna,
            naddatek: data.naddatek
        });
    }

    removeNaddatek(naddatekId: string): firebase.Promise<any> {
        return this.naddatki.remove(naddatekId);
    }

    usunPozycje(idPozycje) {
        return this.pozycje.remove(idPozycje);
    }

}
