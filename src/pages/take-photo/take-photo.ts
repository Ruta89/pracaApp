import { FirebaseListObservable } from 'angularfire2/database';

import { PracaServiceProvider } from './../../providers/praca-service/praca-service';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {
  items: FirebaseListObservable<any[]>
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pracaService: PracaServiceProvider,
    private camera: Camera
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePhotoPage');
     this.items = this.pracaService.getPhotos();
  }
  saveResults(imageData) {
    this.pracaService
      .savePhoto(imageData)
      .then(_ => {
        console.log('zapisano zdjecie');
      })
      .catch(err => {
        alert(err);
      });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      ImageData => {
        this.pracaService.savePhoto(ImageData).then(()=>{
          console.log('zdjecie zapisane');
        })
      },
      err => {
        alert(err);
      }
    ).catch((err)=>{
      alert(err);
    });
  }
}
