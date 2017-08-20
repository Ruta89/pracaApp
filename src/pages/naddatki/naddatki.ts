import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import photosArray from './data';

@IonicPage()
@Component({
  selector: 'page-naddatki',
  templateUrl: 'naddatki.html'
})
export class NaddatkiPage {
  public photosArray: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  private getPhotos() {
    return Promise.resolve(photosArray)
      .then(data => {
        this.photosArray = data;
      })
      .catch(error => {
        alert(error);
      });
  }

  private openModal(id) {
    console.log('id: ' + id);
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photosArray,
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
