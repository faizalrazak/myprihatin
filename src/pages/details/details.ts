import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

	campaignDetails = String;

  constructor(public loading:LoadingController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl :ViewController) {

      let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();
    		this.campaignDetails = navParams.get('description');
    		load.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
