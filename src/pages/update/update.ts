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
            console.log(this.news)
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

  newsDetails(news){
    this.navCtrl.push(NewsDetailsPage, {news:news}); 
  }
  

}
