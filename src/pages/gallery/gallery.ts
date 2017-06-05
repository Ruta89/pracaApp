import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  private photos: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.createPhotos();
  }

  private createPhotos(length: number = 5) {
    for (let i = 0; i < length; i++) {
      this.photos.push({
        url: `assets/images/${i}.jpg`,
      });
    }
  }

  private openModal() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 1, // The second image
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

}
