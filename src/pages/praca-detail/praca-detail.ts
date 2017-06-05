import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PracaPage } from './../praca/praca';
import { PracaServiceProvider } from '../../providers/praca-service/praca-service';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
    selector: 'page-praca-detail',
    templateUrl: 'praca-detail.html',
})
export class PracaDetailPage {
    currentUser: any;
    date: any;
    idID: any;
    pozycja: any;
    poz: any;
    user: any;
    listaPozycji: any;
    pp: any;
    bb: any;
    userProf: any;
    lp: any;
    item: any;
    data: any;
    dataF: any;
    data2: any;
    l1: number;
    wll: any;
    keyS: any;
    pozObj: any;
    pozObjF: any;
    pozLin: any;
    min: number;
    max: number;
    proc: number;
    mTocm: number;
    maxToM: number;
    dlugoscM: number;
    dlugoscCm: number;
    wynik: number;
    licz: number;
    czas: any;
    auf1: any;
    auf2: any;
    auf3: any;
    aufFormat: any;
    maszyna: any;
    naddatek: any;
    pozLin2: any;
    dataN: any;
    naddatekP: any;
    dataND: any;
    keyN: any;
    idNid: any;
    timestamp: any;
    dateUpdate: any;
    constructor(public authService: AuthServiceProvider, public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public pracaService: PracaServiceProvider, public alertCtrl: AlertController) {
        this.idID = this.navParams.get('id');

        this.currentUser = this.afAuth.auth.currentUser.uid;
        this.userProf = afDb.list('/userProfile/' + this.currentUser);
        this.lp = this.afDb.list('/listaPozycji/');

        this.pozLin = afDb.list('/userProfile/' + this.currentUser + '/listaPozycji/');
        // this.pozLin2 = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/');
        this.item = afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idID, { preserveSnapshot: true });
        this.item.subscribe(snapshot => {
            this.data = snapshot.val();
            this.keyS = snapshot.key;
        });

    }

    ionViewDidLoad() {

        if (this.data.idN) {
            this.idNid = this.data.idN;
            console.log("jest idN this.idN  " + this.idNid + "  jest idN this.data.idN  " + this.data.idN);
            this.naddatekP = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idNid, { preserveSnapshot: true });
            this.naddatekP.subscribe(snapshot => {
                console.log(snapshot.val());
                this.dataND = snapshot.val();
                this.keyN = snapshot.key;
            });
            if (this.data.idN) {
                this.idNid = this.data.idN;
                console.log("jest idN this.idN  " + this.idNid + "  jest idN this.data.idN  " + this.data.idN);
                this.naddatekP = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idNid, { preserveSnapshot: true });
                this.naddatekP.subscribe(snapshot => {
                    console.log(snapshot.val());
                    this.dataND = snapshot.val();
                    this.keyN = snapshot.key;
                });
                console.log(this.dataND);
                console.log("this.naddatekP  " + this.naddatekP);
            } else {
                console.log("niema idN");
            }

        } else {
            console.log("niema idN");
        }


        console.log('ionViewDidLoad PracaDetailPage');

        // ustawianie tolerancji
        this.proc = (0.01 * this.data.l1); // 0.02
        this.min = this.data.l1 - this.proc;
        this.max = (this.data.l1 * 1) + (this.proc * 1);
        console.log("min --  " + this.min + "max --  " + this.max);


        // ustawianie licznika -------------------------------------------------------
        // od 1t do 4
        if (this.data.wll >= 1 && this.data.wll <= 4) {
            this.licz = (this.data.l1 * 1) * 22;
        } else {
            console.log("l1 to nie 1, 2, 3, 4");
        }
        // od 5t  do 8
        if (this.data.wll >= 5 && this.data.wll <= 8) {
            this.licz = (this.data.l1 * 1) * 20;
        } else {
            console.log("l1 to nie 5 - 8");
        }


        // Format zlecenia -------------------------------------------------------------------
        if (this.data.auf.length > 8) {
            // format auf
            this.auf1 = this.data.auf.substr(0, 6); // 777888
            this.auf2 = this.data.auf.substr(6, 2);// 01
            this.auf3 = this.data.auf.substr(8, 2); //10
            this.aufFormat = this.auf1 + " / " + this.auf2 + " / " + this.auf3;
        } else {
            this.aufFormat = this.data.auf;
            console.log("auf ma mniej niz 8 znakow");
        }

    }

    usunPoz(id) {
        this.pozLin.remove(id).then(() => {
            this.navCtrl.push(PracaPage);
        });
    }

    addNaddDetail(keyS, data) {
        let prompt = this.alertCtrl.create({
            title: 'keyS to id: poz ' + keyS + ' ' + data.wll + ', l1: ' + data.l1,
            inputs: [
                {
                    name: 'maszyna',
                    type: 'text',
                    placeholder: 'Maszyna'
                },
                {
                    name: 'mojNaddatek',
                    type: 'number',
                    placeholder: 'Naddatek'
                },
                {
                    name: 'notatka',
                    type: 'text',
                    placeholder: 'Notatka'
                }
            ],
            buttons: [
                {
                    text: 'Anuluj',
                    handler: (dataN) => {
                        console.log('Anulowales dodanie naddatku' + dataN);
                    }
                },
                {
                    text: 'Zapisz',
                    handler: (dataN) => {
                        this.pracaService.addNaddDetailS(keyS, data, dataN);
                    }
                }
            ]
        });
        prompt.present();
    }

    addNad(keyS, data) {
        let prompt = this.alertCtrl.create({
            title: 'keyS to id: poz ' + keyS + ' Wpisz naddatek wll: ' + data.wll + ', l1: ' + data.l1,
            inputs: [
                {
                    name: 'maszyna',
                    type: 'text',
                    value: data.maszyna
                },
                {
                    name: 'naddatek',
                    type: 'number',
                    value: data.naddatek
                }
            ],
            buttons: [
                {
                    text: 'Anuluj',
                    handler: (data) => {
                        console.log('Anulowales dodanie naddatku' + data);
                    }
                },
                {
                    text: 'Zapisz',
                    handler: (data) => {
                        this.pracaService.updateNaddatek(keyS, data);
                        return data.idN;
                    }
                }
            ]
        });
        prompt.present();
    }

    updatePozycja(keyS, data) {
        let prompt = this.alertCtrl.create({
            title: 'Update  ' + keyS + ' ' + data.wll + '  ' + data.l1,
            inputs: [
                {
                    name: 'wll',
                    type: 'text',
                    value: data.wll
                },
                {
                    name: 'l1',
                    type: 'number',
                    value: data.l1
                }
                ,
                {
                    name: 'm',
                    type: 'number',
                    value: data.m
                },
                {
                    name: 'nici',
                    type: 'number',
                    value: data.nici
                },
                {
                    name: 'auf',
                    type: 'number',
                    value: data.auf
                },
                {
                    name: 'ilosc',
                    type: 'number',
                    value: data.ilosc
                }
            ],
            buttons: [
                {
                    text: 'Anuluj',
                    handler: data => {
                        console.log('Anulowales uaktualnienia pozycji');
                    }
                },
                {
                    text: 'Zapisz',
                    handler: data => {
                        this.pracaService.updatePozycja(keyS, data);
                        console.log(" keyS czyli id updatePozycja " + keyS);
                    }
                }
            ]
        });
        prompt.present();
    }
}


