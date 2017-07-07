import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import photosArray from './data';

@IonicPage()
@Component({
  selector: 'page-photo-n',
  templateUrl: 'photo-n.html',
})
export class PhotoNPage {
  photosArray: Array<any>;
  data:any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private modalCtrl: ModalController) {
    this.findAll();
  }
  findAll() {
    console.log("photosArray" + photosArray);
    return Promise.resolve(photosArray)
      .then(data => this.photosArray = data)
      .catch(error => alert(error));
  }

  otworz(id) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photosArray,
      initialSlide: id, // potrzebuje kolejnosc tablicy zaczyna od 0
    });
    modal.present();
    console.log("otworz id:   " + id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoNPage');
  }

}
