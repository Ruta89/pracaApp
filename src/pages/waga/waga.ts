import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import wagiArray from './wagiImgArrayData';
@IonicPage()
@Component({
  selector: 'page-waga',
  templateUrl: 'waga.html'
})
export class WagaPage {
  public wagiArray: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  private getPhotos() {
    return Promise.resolve(wagiArray)
      .then(data => {
        this.wagiArray = data;
      })
      .catch(error => {
        alert(error);
      });
  }

  private openModal(id) {
    console.log('id: ' + id);
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.wagiArray,
      initialSlide: id
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WagaPage');
  }
  ionViewDidEnter() {
    this.getPhotos();
  }
}
