import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracaPage } from './praca';

import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    PracaPage,
  ],
  imports: [
    IonicPageModule.forChild(PracaPage),
    MomentModule
  ],
  exports: [
    PracaPage
  ]
})
export class PracaPageModule { }
