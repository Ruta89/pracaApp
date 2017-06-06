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
    nadList: any;
    constructor(public authService: AuthServiceProvider, public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public pracaService: PracaServiceProvider, public alertCtrl: AlertController) {
        this.idID = this.navParams.get('id');

        this.currentUser = this.authService.currentUserId;
        this.userProf = afDb.list('/userProfile/' + this.currentUser);
        this.lp = this.afDb.list('/listaPozycji/');
        this.nadList = afDb.list('/userProfile/' + this.currentUser + '/naddatki/');
        this.pozLin = afDb.list('/userProfile/' + this.currentUser + '/listaPozycji/');
        // this.pozLin2 = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/');
        this.item = afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idID, { preserveSnapshot: true });
        this.item.subscribe(snapshot => {
            this.data = snapshot.val();
            this.keyS = snapshot.key;
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PracaDetailPage');
        if (this.data.idN) {
            this.idNid = this.data.idN;
            console.log("jest idN this.idN  " + this.idNid);
            this.naddatekP = this.afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idNid, { preserveSnapshot: true });
            this.naddatekP.subscribe(snapshot => {
                this.dataND = snapshot.val();
                this.keyN = snapshot.key;

            });
        } else {
            console.log("niema idN");
        }

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
        // 12 T  28m 6 szpul 132
        if (this.data.wll == 12) {
            this.licz = (this.data.l1 * 1) * 28;

        } else {
            console.log("wll to nie 12");
        }
        // 15 T  36m 6 szpul 132
        if (this.data.wll == 15) {
            this.licz = (this.data.l1 * 1) * 36;

        } else {
            console.log("wll to nie 12");
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
    addNote(keyS, data) {
        let prompt = this.alertCtrl.create({
            title: 'Dodaj notatkę do  '  + keyS,
            inputs: [
                {
                    name: 'note',
                    type: 'text',
                    value: data.note
                },
            ],
            buttons: [
                {
                    text: 'Anuluj',
                    handler: data => {
                        console.log('Anulowales addNote');
                    }
                },
                {
                    text: 'Zapisz',
                    handler: (data) => {
                        this.pracaService.addNoteS(keyS, data);
                        console.log(" keyS czyli id addNote " + keyS);
                        console.log("alert addNote pracaDetail data.note: " + data.note);
                        console.log("alert addNote pracaDetail data: " + data);
                    }
                }
            ]
        });
        prompt.present();
    }

  

}


