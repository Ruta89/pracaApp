import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracaDetailPage } from './praca-detail';

@NgModule({
  declarations: [
    PracaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PracaDetailPage),
  ],
  exports: [
    PracaDetailPage
  ]
})
export class PracaDetailPageModule {}
