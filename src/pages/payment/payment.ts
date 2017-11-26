import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController} from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { MyDonationPage } from '../my-donation/my-donation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  // public donationForm:FormGroup;
  
  constructor(public iab:InAppBrowser, public formBuilder:FormBuilder, public modalCtrl:ModalController, public toast:ToastController, public httpProvider:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
      
      this.campaign = navParams.get('campaign');
      console.log(this.campaign);

      // this.donationForm = formBuilder.group({
      //       amount: ['', Validators.compose([Validators.required])],
      //       campaign_id : this.campaign.campaign_id
      //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

 
  donate(){

    // if(!this.donationForm.valid){
    //     // console.log(this.registerForm.value);
    // }
    // else {
    //       console.log("success!")
    //       // console.log(this.registerForm.value);

    //       let details = this.donationForm.value;
    //       console.log(details);

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
  // }

 closeModal(){
    this.viewCtrl.dismiss();
 }

}
