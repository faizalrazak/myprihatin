import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

	campaign:any;

  constructor(
    public loading:LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl :ViewController
    )
  {

      let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();
    		this.campaign = navParams.get('campaign');
        console.log(this.campaign);
    		load.dismiss();
  }

}
