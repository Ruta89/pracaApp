import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pozycja-detail',
  templateUrl: 'pozycja-detail.html'
})
export class PozycjaDetailPage {
  pozycja: any;
  wll: string;
  l1: number;
  auf: any;
  m:number;
  nici:any;
  ilosc: number;
  czas: number;
  date: Date;
  note: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if(navParams.get('pozycja')){
          this.pozycja = navParams.get('pozycja');
      // this.pozycja = navParams.get('pozycja');
    console.log('pozycja detail:  ', this.pozycja);
    this.wll = this.pozycja.wll;
    this.l1 = this.pozycja.l1;
    this.m = this.pozycja.m;
    this.nici = this.pozycja.nici;
    this.auf = this.pozycja.auf;
    this.ilosc = this.pozycja.ilosc;
    this.czas = this.pozycja.czas;
    this.date = this.pozycja.date;
     this.note = this.pozycja.note;
    }else{
      console.log('nie ma navParams: pozycja');
      this.navCtrl.push('PracaPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PozycjaDetailPage');
  }
}
