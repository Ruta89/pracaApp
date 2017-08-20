import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProdPage } from './modal-prod';

@NgModule({
  declarations: [
    ModalProdPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProdPage),
  ],
  exports: [
    ModalProdPage
  ]
})
export class ModalProdPageModule {}
