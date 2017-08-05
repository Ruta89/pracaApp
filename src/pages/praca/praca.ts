import {
  Observable
} from 'rxjs/Observable';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import {
  PracaServiceProvider
} from './../../providers/praca-service/praca-service';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  ActionSheetController,
  NavParams,
  ModalController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
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
  templateUrl: 'praca.html'
})
export class PracaPage {
  formGroupDodajPozycje: FormGroup;
  data: any;
  listaPozycji: FirebaseListObservable<any[]>;
  pozycje: Observable<any[]>;
  pozycje2: Observable<any[]>;
  naddatki: Observable<any[]>;
  wll: number;
  l1: number;
  m: any;
  nici: any;
  auf: any;
  ilosc: any;
  czas: number;

  pozycja: Pozycja = new Pozycja();
  user: any;
  toggle: boolean = true;
  segmentPraca: string = 'pozycje';
  pozycjaDetail: any;
  currentUser: any;
  id: any;
  jestForm: boolean = false;
  przyciskDodaj: boolean = true;
  przyciskZamknij: boolean = false;
  resoult: any;
  mojNaddatek: any;
  date: any;
  timestamp: any;
  dateNow: any;
  naddatkiP: any;
  p: any;
  authenticated: any;
  szychta: Array<any[]>;
  robota: Array<any[][]>;
  robota2: Array<any[]> = [];
  kazdaszychta: any;
  pozycjeArr: Array<any[]>;
  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pracaService: PracaServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public afd: AngularFireDatabase
  ) {
    // this.authenticated = this.authData.authenticated;
    // this.currentUser = authData.authenticated;
    // this.currentUser = afAuth.authState;
    // this.dateNow = new Date().toISOString();
    // this.naddatki = pracaService.naddatki;
    // this.pozycje = pracaService.pozycje;
    this.createForm();
  }

  getPozycje() {
    this.pracaService.getPozycje();
  }
  getNaddatki() {
    this.pracaService.getNaddatki();
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
      m: '',
      nici: '',
      auf: '',
      ilosc: '',
      czas: ''
    });
  }

  openDetail(id) {
    this.navCtrl.push('PracaDetailPage', {
      id: id.$key
    });
  }

  openDetailNaddatek(naddatek) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Wll: ' +
      naddatek.wll +
      ' , L1: ' +
      naddatek.l1 +
      ' - Co chcesz zrobić?',
      buttons: [{
        text: 'Uaktualnij naddatek',
        handler: () => {
          this.updateNaddatek(naddatek.$key, naddatek);
          console.log(
            ' --  this.updateNaddatek(id, naddatek.wll);' +
            naddatek.$key +
            '  ' +
            naddatek.wll
          );
        }
      },
      {
        text: 'Usuń naddatek',
        role: 'destructive',
        handler: () => {
          this.pracaService.removeNaddatek(naddatek.$key);
        }
      },
      {
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

  zapiszPozycje(value) {
    console.log('zapiszPozycje(value)  ', value);
    this.pracaService.savePozycja(value).then(() => {
      this.navCtrl.setRoot('PracaPage');
    });
  }

  otworzPozycje() {
    const modalPozycja = this.modalCtrl.create('DodajPozycjePage');
    modalPozycja.present();
  }

  addNaddatek() {
    let prompt = this.alertCtrl.create({
      title: 'Wpisz naddatek',
      inputs: [{
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
      buttons: [{
        text: 'Anuluj',
        handler: data => { }
      },
      {
        text: 'Zapisz',
        handler: data => {
          this.pracaService
            .zapiszNaddatek(data)
            .then(() => {
              console.log('zapisz naddatek ok', data);
            })
            .catch(err => {
              alert(err);
            });
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
      inputs: [{
        name: 'wll',
        placeholder: 'Tonaz',
        value: wll
      }],
      buttons: [{
        text: 'Anuluj',
        handler: data => { }
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
    console.log(
      '-- updateNaddatek przyjmuje id: ' + id + ' naddatek.l1: ' + naddatek.l1
    );
    let prompt = this.alertCtrl.create({
      title: 'Aktualizacja danych',
      message: 'Wprowadz poprawki ',
      inputs: [{
        name: 'wll',
        placeholder: 'Tonaz',
        value: naddatek.wll
      },
      {
        name: 'l1',
        placeholder: 'Dlugosc',
        value: naddatek.l1
      },
      {
        name: 'maszyna',
        placeholder: 'Maszyna',
        value: naddatek.maszyna
      },
      {
        name: 'mojNaddatek',
        placeholder: 'Naddatek',
        value: naddatek.mojNaddatek
      }
      ],
      buttons: [{
        text: 'Anuluj',
        handler: data => {
          //console.log('Kliknales Anuluj');
        }
      },
      {
        text: 'Zapisz',
        handler: data => {
          this.pracaService.updateNaddatek(id, data);
          console.log(' id updateNaddatek' + id);
        }
      }
      ]
    });
    prompt.present();
  }

  showOptionslistaPozycji(produkcjaId, wll, l1, m, nici, auf, ilosc) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Co chcesz zrobić?' + produkcjaId,
      buttons: [{
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
      title: 'Wll: ' +
      naddatek.wll +
      ' , L1: ' +
      naddatek.l1 +
      ' - Co chcesz zrobić?',
      buttons: [{
        text: 'Uaktualnij naddatek',
        handler: () => {
          this.updateNaddatek(id, naddatek);
          console.log(
            ' --  this.updateNaddatek(id, naddatek.wll);' +
            id +
            '  ' +
            naddatek.wll
          );
        }
      },
      {
        text: 'Usuń naddatek',
        role: 'destructive',
        handler: () => {
          this.pracaService
            .removeNaddatek(id)
            .then(() => {
              console.log('usunieto naddatek');
            })
            .catch(err => {
              alert(err);
            });
        }
      },
      {
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
    console.log('Hello Praca Page Page');

    let loading = this.loadingCtrl.create({
      content: 'Uzyskiwanie najnowszych wpisów ...'
    });

    loading.present();
    this.pracaService.authState.subscribe(user => {
      if (user) {
        this.pozycje = this.pracaService.wyswietlPozycje();
        this.naddatki = this.pracaService.wyswietlNaddatki();
        setTimeout(() => {
          loading.dismiss();
        }, 2500);

        this.toastCtrl
          .create({
            message: `Witam w Stajni, ${user.email}`,
            duration: 3000
          })
          .present();
      } else {
        this.pozycje = null;
        this.naddatki = null;
        this.toastCtrl
          .create({
            message: `Nie autoryzowano`,
            duration: 3000
          })
          .present();
      }
    });
    this.pracaService.wyswietlPozycje().subscribe(data => {
      console.log('%%%%%%%%%%%  ', data);


    });
  }

  ionViewDidEnter() { }
}
