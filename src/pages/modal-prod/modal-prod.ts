import { PracaServiceProvider } from './../../providers/praca-service/praca-service';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  IonicPage,
  ViewController
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-prod',
  templateUrl: 'modal-prod.html'
})
export class ModalProdPage {
  public form: any;
  public productions: FirebaseListObservable<any[]>;
  public productionWll: any = '';
  public productionL1: any = '';
  public productionLicznik: any = '';
  public productionAuf: any = '';
  public productionNici: any = '';
  public productionSzt: any = '';
  public productionCzas: any = '';
  public productionId: any = '';
  public productionCreated: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private afDb: AngularFireDatabase,
    public pracaService: PracaServiceProvider,
    private viewCtrl: ViewController
  ) {
    this.form = fb.group({
      wll: ['', Validators.required],
      l1: ['', [Validators.required]],
      m: [''],
      nici: [''],
      auf: [''],
      ilosc: [''],
      czas: ['']
    });

    if (navParams.get('id')) {
      let id = navParams.get('id');
      let value = navParams.get('value');

      this.productionWll = value.wll;
      this.productionL1 = value.l1;
      this.productionLicznik = value.m;
      this.productionNici = value.nici;
      this.productionAuf = value.auf;
      this.productionCzas = value.czas;
      this.productionSzt = value.ilosc;
      this.productionId = id;
      this.productionCreated = value.firefireTimestamp;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProdPage');
  }

  save(val) {
    let wll: string = this.form.controls['wll'].value;
    let l1: string = this.form.controls['l1'].value;
    let m: string = this.form.controls['m'].value;
    let nici: string = this.form.controls['nici'].value;
    let auf: string = this.form.controls['auf'].value;
    let czas: string = this.form.controls['czas'].value;
    let ilosc: string = this.form.controls['ilosc'].value;

    this.pracaService.updatePozycja(this.productionId, val);

    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
