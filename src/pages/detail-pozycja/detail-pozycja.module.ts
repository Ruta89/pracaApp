import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPozycjaPage } from './detail-pozycja';

@NgModule({
  declarations: [
    DetailPozycjaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPozycjaPage),
  ],
  exports: [
    DetailPozycjaPage
  ]
})
export class DetailPozycjaPageModule {}
