import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PozycjaDetailPage } from './pozycja-detail';

@NgModule({
  declarations: [
    PozycjaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PozycjaDetailPage),
  ],
})
export class PozycjaDetailPageModule {}
