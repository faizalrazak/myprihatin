import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsDetailsPage } from '../news-details/news-details'

/**
 * Generated class for the UpdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

	news : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.news = navParams.get('news');
    console.log(this.news);
  }

  newsDetails(news){
    this.navCtrl.push(NewsDetailsPage, {news:news}); 
  }
  

}
