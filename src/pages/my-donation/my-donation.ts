import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http'

/**
 * Generated class for the MyDonationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-donation',
  templateUrl: 'my-donation.html',
})
export class MyDonationPage {

  donate:any;

  constructor(public toast:ToastController, private httpprovider:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {

    this.donate = navParams.get('value');
    console.log(this.donate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDonationPage');
  }

  confirmButton(){
   let details = {
            campaign_id : 1,
            user_id : 1,
            amount : this.donate,
            status : 'success'
      }

         this.httpprovider.postFund(details).then((result) => {
            const toast = this.toast.create({
              message: 'Donate added successfully',
              duration: 3000,
              position: 'middle'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
        }, (err) => {
          console.log(err);
        });
  }

  failButton(){

    let details = {
          campaign_id : 1,
          user_id : 1,
          amount : this.donate,
           status : 'fail'
    }

       this.httpprovider.postFund(details).then((result) => {
          const toast = this.toast.create({
            message: 'Donate added failed',
            duration: 3000,
            position: 'middle'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
      }, (err) => {
        console.log(err);
      });

  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }

}
