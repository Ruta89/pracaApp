import { PracaPage } from './../praca/praca';
import { MyApp } from './../../app/app.component';
import { PracaServiceProvider } from './../../providers/praca-service/praca-service';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  IonicPage,
  ViewController,
  AlertController,
  ModalController
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail-pozycja',
  templateUrl: 'detail-pozycja.html'
})
export class DetailPozycjaPage {
  id;
  value: any;
  note: string;
  wll: number;
  //tolerancja
  min: number;
  max: number;
  //format auftragu
  aufFormat: any;
  czas: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public pracaService: PracaServiceProvider,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPozycjaPage');
    if (this.navParams.get('pozycja')) {
      this.value = this.navParams.get('pozycja');
      this.id = this.value.$key;
      this.note = this.value.notatka;
      // console.log('id', this.id);
      // console.log('value', this.value);
    } else {
      this.navCtrl.setRoot('PracaPage');
    }
    // ************************************************************
    if (this.value) {
      // ustawianie tolerancji
      let proc = 0.01 * this.value.l1; // 0.02
      this.min = this.value.l1 - proc;
      this.max = this.value.l1 * 1 + proc * 1;
      // console.log('min --  ' + this.min + 'max --  ' + this.max);

      // ustawianie licznika -------------------------------------------------------
      // od 1t do 4
      if (this.value.wll >= 1 && this.value.wll <= 4) {
        let licz = this.value.l1 * 1 * 22;
      } else {
        // console.log('l1 to nie 1, 2, 3, 4');
      }
      // od 5t  do 8
      if (this.value.wll >= 5 && this.value.wll <= 8) {
        let licz = this.value.l1 * 1 * 20;
      } else {
        // console.log('l1 to nie 5 - 8');
      }

      // Format zlecenia -------------------------------------------------------------------
      if (this.value.auf.length > 8) {
        // format auf
        let auf1 = this.value.auf.substr(0, 6); // 777888
        let auf2 = this.value.auf.substr(6, 2); // 01
        let auf3 = this.value.auf.substr(8, 2); //10
        this.aufFormat = auf1 + ' / ' + auf2 + ' / ' + auf3;
      } else {
        this.aufFormat = this.value.auf;
        // console.log('auf ma mniej niz 8 znakow');
      }
      
      // Czas --------------------------------------------------------------------
      this.czas = (this.value.czas * this.value.ilosc)/60;
    }
    // ************************************************************
  }

  addNote(id, note) {
    this.pracaService
      .addNoteServ(id, note)
      .then(() => {
        console.log('dodano notatke id:' + id + '  note: ' + note);
        this.navCtrl.push('PracaPage');
      })
      .catch(err => {
        alert(err);
      });
  }

  updatePozycja(ID, data) {
    let prompt = this.alertCtrl.create({
      title: 'Update WLL:',
      inputs: [
        {
          name: 'wll',
          type: 'number',
          value: data.wll
        },
        {
          name: 'l1',
          type: 'number',
          value: data.l1
        },
        {
          name: 'm',
          type: 'number',
          value: data.m
        },
        {
          name: 'ilosc',
          type: 'number',
          value: data.ilosc
        },
        {
          name: 'nici',
          type: 'text',
          value: data.nici
        },
        {
          name: 'auf',
          type: 'number',
          value: data.auf
        },
        {
          name: 'czas',
          type: 'number',
          value: data.czas
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            // console.log('Anulowales uaktualnienia pozycji');
          }
        },
        {
          text: 'Zapisz',
          handler: data => {
            this.pracaService
              .updatePozycja(ID, data)
              .then(() => {
                this.navCtrl.push('PracaPage');
              })
              .catch(err => {
                console.log('ERR W DETAIL POZYCJE UPDATE ', err);
              });
          }
        }
      ]
    });
    prompt.present();
  }
  usunPoz(id) {
    this.pracaService
      .usunPozycje(id)
      .then(() => {
        console.log('usunieto  ');
        this.navCtrl.push(PracaPage);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }
}
