import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewsDetailsPage } from '../news-details/news-details';
import { HttpProvider } from '../../providers/http/http'

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

	news : any;
  id: any;
  news_length;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public httpprovider:HttpProvider
    )
  {
    let load = this.loading.create({
      content: 'Please wait...'
    });

        load.present();
        this.id = navParams.get('id');
        console.log(this.id)

        this.httpprovider.getCampaignNews(this.id).subscribe(
          data => {
            this.news = data.data;
            this.news_length = this.news.length;
            console.log(this.news_length)
          },
          err => {
            load.dismiss();
            console.log(err);
          },
          ()=>{
            load.dismiss();
          console.log('Campaign is ok!')
        }
        );
  }

  newsDetails(neww){
    this.navCtrl.push(NewsDetailsPage, {neww}); 
  }
  

}
