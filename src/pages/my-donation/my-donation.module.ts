import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDonationPage } from './my-donation';

@NgModule({
  declarations: [
    MyDonationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDonationPage),
  ],
})
export class MyDonationPageModule {}
