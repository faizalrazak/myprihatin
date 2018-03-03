import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {

	details:any;

  constructor(
    public viewCtrl:ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
    )
  {
  	this.details = navParams.get('neww');
  }
}
