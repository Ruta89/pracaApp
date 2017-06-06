
//import { AuthService } from './../auth-service/auth-service2';
import { AuthServiceProvider } from '../auth-service/auth-service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/auth';
//import moment from 'moment';

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
    authState: any;
    user: any;
    userId: any;
    auth: any;
    mojNaddatek: any;
    naddatekDetail: any;
    idPozycji: any;
    idN: any;
    itemsN: any;
    naddatekP: any;
    dataN: any;
    pozycja: any;

    constructor(public afAuth: AngularFireAuth, public http: Http, public afDb: AngularFireDatabase, public authService: AuthServiceProvider) {
         this.afAuth.authState.subscribe((auth) => {
      this.authState  = auth;
    });
        this.auth = this.authService.authenticated;
        this.currentUser = this.afAuth.auth.currentUser;
        this.userId = this.authService.currentUserId;
        console.log("this.this.userId musi byc -------------------------------------   " + this.userId);

        this.pozycje = afDb.list('/userProfile/' + this.userId + '/listaPozycji', {
            query: {
                limitToLast: 24
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        this.naddatki = afDb.list(`/userProfile/${this.userId}/naddatki`);
    }


    getPozycja(id: string): FirebaseObjectObservable<any> {
        return this.pozycjaDetail = this.afDb.object('/userProfile/' + this.userId + '/listaPozycji' + id);
    }

    getPozycje() {
        return this.pozycje;
    }

    getNaddatki() {
        return this.naddatki;
    }
    getNaddatek(id: string) {
        return this.naddatekDetail = this.afDb.object('/userProfile/' + this.userId + '/naddatki' + id);
    }

    savePozycja(wll, l1, m, nici, auf, ilosc) {
        this.pozycje.push({
            wll: wll,
            l1: l1,
            m: m,
            nici: nici,
            auf: auf,
            ilosc: ilosc,
            date: new Date().toISOString()
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
            console.log("modal dodaj pozycje: nowaPozycja  " + nowaPozycja);
        }, error => {
            console.log("zapiszPozycje()  " + error);
        });
    }


    //tonaz: number, dlugosc: number, maszyna: string, naddatek: number, timestamp: string
    zapiszNaddatek(data) {
        this.naddatki.push({
            wll: data.wll,
            l1: data.l1,
            maszyna: data.maszyna,
            mojNaddatek: data.mojNaddatek,
            date: new Date().toISOString()
        }).then((data) => {
            console.log("praca service zapiszNaddatek data.l1  " + data.l1);
        }).catch((error) => {
            console.log("praca service, metoda addNaddatek .catch((error) => {  " + error);
        });
    }

    //detailPage
    zapiszNad(id, wll, l1, data) {

        this.afDb.list('userProfile/' + this.userId + '/naddatki/').push({
            idPoz: id,
            wll: wll,
            l1: l1,
            maszyna: data.maszyna,
            mojNaddatek: data.mojNaddatek,
            timestamp: new Date().toISOString()
        }).then((data) => {
            console.log("praca service zapiszNad  wll  " + wll);
        }).catch((error) => {
            console.log("praca service, metoda addNaddatek .catch((error) => {  " + error);
        });
    }

    addNaddDetailS(keyS, data, dataN) {
        this.naddatki.push({
            wll: data.wll,
            l1: data.l1,
            maszyna: dataN.maszyna,
            mojNaddatek: dataN.mojNaddatek,
            notatka: dataN.notatka,
            date: new Date().toISOString(),
            idPozycji: keyS
        }).then((dane) => {
            console.log(" -- dane.key to beedzie key dodawanego naddatku ? :) " + dane.key);
            console.log(" keyS to bedzie key pozycji  " + keyS);
            this.pozycje.update(keyS, {
                dateUpdate: new Date().toISOString(),
                idN: dane.key
            }).then(() => {
                console.log("zaktualizowano pozycję o klucz do tego naddatku");
            }).catch((error) => {
                console.log("błąd addNaddDetailS 1:  " + error);
            });
        }).catch((error) => {
            console.log("błąd addNaddDetailS 2:  " + error);
        });
    }

    updateNaddatek(id, data) {
        console.log("updateNaddatek jest id? " + id);
        this.naddatki.update(id, {
            wll: data.wll,
            l1: data.l1,
            maszyna: data.maszyna,
            mojNaddatek: data.mojNaddatek
        });
    }

    updatePozycja(id, data) {
        console.log("updatePozycja jest id? " + id);
        this.pozycje.update(id, {
            wll: data.wll,
            l1: data.l1,
            m: data.m,
            nici: data.nici,
            auf: data.auf,
            ilosc: data.ilosc,
            dateUpdate: new Date().toISOString()
        });
    }

    addNoteS(id, data) {
        this.pozycja = this.afDb.object('/userProfile/' + this.userId + '/listaPozycji/' + id)
       // this.afDb.object('/userProfile/' + this.userId + '/listaPozycji/' + id).update({
    //   this.afDb.list('/userProfile/' + this.userId + '/listaPozycji/' + id).update({
    //         note : note
    //     }).catch( err => {
    //         console.log(err);
    //     });
    this.pozycja.update({
        note: data.note,
        dateUpdate: new Date().toISOString()
    });



        // console.log("addNoteS jest id? " + id);

        // this.pozycje.update(id, {
        //     note: data.note,
        //     dateUpdate: new Date().toISOString()
        // });
    }

    removeNaddatek(naddatekId: string): firebase.Promise<any> {
        return this.naddatki.remove(naddatekId);
    }

    usunPozycje(idPozycje) {
        return this.pozycje.remove(idPozycje);
    }

}
