import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import wagiArray from './wagiImgArrayData';
//import { ZoomableImage } from 'ionic-gallery-modal';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  wagiArray: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
   this.findAll();
  }
    findAll() {
    return Promise.resolve(wagiArray)
      .then(data => this.wagiArray = data)
      .catch(error => alert(error));
  }

  otworz(id) {
    console.log("otworz id:   " + id);
    let modalW = this.modalCtrl.create(GalleryModal, {
      photos: wagiArray,
      initialSlide: id, // potrzebuje kolejnosc tablicy zaczyna od 0
    });
    modalW.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

}
