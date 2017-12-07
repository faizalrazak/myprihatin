import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController} from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SignPage } from '../sign/sign';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

	public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  value : number = 0;
  campaign : any;
  
  constructor(public iab:InAppBrowser, public modalCtrl:ModalController, public toast:ToastController, public httpProvider:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
      
      this.campaign = navParams.get('campaign');
      console.log(this.campaign);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

 
  donate(){

          let details = {
              campaign_id : this.campaign.campaign_id,
              amount : this.value
          }

          this.httpProvider.molpay(details).then((result) => {

            console.log(result);
            const browser = this.iab.create(result.toString());
        },
          (err) => {
          console.log(err);
      });
    }

 login(){
   this.navCtrl.push(SignPage);
 }

}
