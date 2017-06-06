import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { PracaServiceProvider } from './../../providers/praca-service/praca-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
class Pozycja {
  wll: number;
  l1: number;
  licznik: number;
  nici: string;
  auf: number;
  ilosc: number;
  currentPerson: any;
  jestForm: boolean = false;
  przyciskDodaj: boolean = true;
  przyciskZamknij: boolean = false;
  constructor() { }
}
@IonicPage()
@Component({
  selector: 'page-praca',
  templateUrl: 'praca.html',
})
export class PracaPage {

  formGroupDodajPozycje: FormGroup;
  data: any;
  listaPozycji: FirebaseListObservable<any[]>;
  pozycje: FirebaseListObservable<any>;
  wll: any;
  l1: number;
  m: any;
  nici: any;
  auf: any;
  ilosc: any;
  naddatki: FirebaseListObservable<any[]>;
  pozycja: Pozycja = new Pozycja;
  user: any;
  toggle: boolean = true;
  segmentPraca: string = "pozycje";
  pozycjaDetail: any;
  currentUser: any;
  id: any;
  jestForm: boolean = false;
  przyciskDodaj: boolean = true;
  przyciskZamknij: boolean = false;
  resoult: any;
  mojNaddatek: any;
  date:any;
  timestamp: any;
  dateNow: any;
  naddatkiP: any;
  p: any;
  constructor(private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pracaService: PracaServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public afDB: AngularFireDatabase,
    public authData: AuthServiceProvider) {

    this.dateNow = new Date().toISOString();
    this.naddatki = pracaService.naddatki;
    this.pozycje = pracaService.pozycje;
    this.createForm();
  }

  getPozycja(id: string): FirebaseObjectObservable<any> {
    return this.pozycjaDetail = this.afDB.object('/userProfile/' + this.currentUser + '/listaPozycji/' + id);
  }
  

  pokaForm() {
    this.jestForm = true;
    this.przyciskDodaj = false;
    this.przyciskZamknij = true;
  }

  zamknijForm() {
    this.jestForm = false;
    this.przyciskDodaj = true;
    this.przyciskZamknij = false;
  }

  createForm() {
    this.formGroupDodajPozycje = this.formBuilder.group({
      wll: ['', Validators.required],
      l1: ['', Validators.required],
      m: ['', Validators.required],
      nici: ['', Validators.required],
      auf: ['', Validators.required],
      ilosc: ['', Validators.required]
    });
  }

  openDetail(id) {
    this.navCtrl.push('PracaDetailPage', {
      id: id
    });
  }

  zapiszPozycje(wll, l1, m, nici, auf, ilosc) {
    this.pracaService.savePozycja(wll, l1, m, nici, auf, ilosc);
    this.navCtrl.push('PracaPage');
  }

  otworzPozycje() {
    const modalPozycja = this.modalCtrl.create('DodajPozycjePage');
    modalPozycja.present();
  }

  addNaddatek() {
    let prompt = this.alertCtrl.create({
      title: 'Wpisz naddatek',
      inputs: [
        {
          name: 'wll',
          type: 'number',
          placeholder: 'tonaz'
        },
        {
          name: 'l1',
          type: 'number',
          placeholder: 'dlugosc'
        },
        {
          name: 'maszyna',
          type: 'text',
          placeholder: 'maszyna'
        },
        {
          name: 'mojNaddatek',
          type: 'number',
          placeholder: 'mojNaddatek'
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            // console.log('Anulowales dodanie naddatku');
          }
        },
        {
          text: 'Zapisz',
          handler: data => {
            this.pracaService.zapiszNaddatek(data);
          }
        }
      ]
    });
    prompt.present();
  }

  usunPozycje(produkcjaId: string) {
    this.listaPozycji.remove(produkcjaId);
  }


  uaktualnijPozycje(produkcjaId, wll, l1, m, nici, auf, ilosc) {
    let alert = this.alertCtrl.create({
      title: 'Aktualizacja pozycji' + produkcjaId,
      message: 'Możesz wprowadzić poprawki',
      inputs: [
        {
          name: 'wll',
          placeholder: 'Tonaz',
          value: wll
        },

      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            // console.log('Kliknales Anuluj uaktualnijPozycje');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.listaPozycji.update(produkcjaId, {
              wll: data.wll,
              l1: data.l1,
              m: data.m,
              nici: data.nici,
              auf: data.auf,
              ilosc: data.ilosc
            });
          }
        }
      ]
    });
    alert.present();
  }


  updateNaddatek(id, naddatek) {
    console.log("-- updateNaddatek przyjmuje id: " + id + " naddatek.l1: " + naddatek.l1);
    let prompt = this.alertCtrl.create({
      title: 'Aktualizacja danych',
      message: 'Wprowadz poprawki ',
      inputs: [
        {
          name: 'wll',
          placeholder: "Tonaz",
          value: naddatek.wll
        },
        {
          name: 'l1',
          placeholder: "Dlugosc",
          value: naddatek.l1
        },
        {
          name: 'maszyna',
          placeholder: "Maszyna",
          value: naddatek.maszyna
        },
        {
          name: 'mojNaddatek',
          placeholder: "Naddatek",
          value: naddatek.mojNaddatek
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            //console.log('Kliknales Anuluj');
          }
        },
        {
          text: 'Zapisz',
          handler: data => {
            this.pracaService.updateNaddatek(id, data);
            console.log(" id updateNaddatek" + id);
          }
        }
      ]
    });
    prompt.present();
  }


  showOptionslistaPozycji(produkcjaId, wll, l1, m, nici, auf, ilosc) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Co chcesz zrobić?' + produkcjaId,
      buttons: [
        {
          text: 'Usuń pozycje',
          role: 'destructive',
          handler: () => {
            this.usunPozycje(produkcjaId);
          }
        },
        {
          text: 'Uaktualnij pozycje',
          handler: () => {
            this.uaktualnijPozycje(produkcjaId, wll, l1, m, nici, auf, ilosc);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            //  console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }



  showOptions(id, naddatek) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Wll: ' + naddatek.wll + ' , L1: ' + naddatek.l1 + ' - Co chcesz zrobić?',
      buttons: [
        {
          text: 'Uaktualnij naddatek',
          handler: () => {
            this.updateNaddatek(id, naddatek);
            console.log(" --  this.updateNaddatek(id, naddatek.wll);" + id + '  ' + naddatek.wll);
          }
        },
        {
          text: 'Usuń naddatek',
          role: 'destructive',
          handler: () => {
            this.pracaService.removeNaddatek(id);
          }
        }, {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            // console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }


  ionViewDidLoad() {
    // console.log('Hello Praca Page Page');

    let loading = this.loadingCtrl.create({
      content: 'Uzyskiwanie najnowszych wpisów ...'
    });

    loading.present();

    if (this.pracaService.pozycje) {
      setTimeout(() => loading.dismiss()
        , 500);
      
    } else {
      console.log('listaPozycji nie zostala zaladowana');
    }


  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toastCtrl.create({
          message: `Witam w APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      } else {
        this.toastCtrl.create({
          message: `Nie autoryzowano`,
          duration: 3000
        }).present();

        // setTimeout(() => {
        //   this.navCtrl.push('LoginPage');
        // }, 3000);

      }
    });

  }

}
