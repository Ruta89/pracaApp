import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoNPage } from './photo-n';

@NgModule({
  declarations: [
    PhotoNPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoNPage),
  ],
  exports: [
    PhotoNPage
  ]
})
export class PhotoNPageModule {}
