import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NewsDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {

	details:any;

  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  	this.details = navParams.get('news');
  	console.log('sini')
  	console.log(this.details)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }
}
