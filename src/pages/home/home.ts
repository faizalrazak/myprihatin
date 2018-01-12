import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ModalController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { HttpProvider } from '../../providers/http/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { SignPage } from '../sign/sign';
import * as moment from 'moment'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  likeIcon:string = 'dark';
  latestcampaign : any;
  progressBar:any;
  sliderImage : any;
  remainingDays : any;
  percentage : any;
	slideLength : boolean = false;
  comments : any;

  constructor(public toast:ToastController, public loading:LoadingController, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public modalCtrl:ModalController, public httpprovider:HttpProvider, public navParams:NavParams, public socialSharing:SocialSharing) {
     
    
  }

  ionViewDidLoad(){
    let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();

        this.httpprovider.getLatest().subscribe(
        data => {
          console.log(data)
          this.latestcampaign = data.data;
          console.log(this.latestcampaign)
          this.remainingDays = moment(data.data.campaign_end_date, "YYYYMMDD").lang("ms").fromNow();
          this.percentage = (data.data.fund_amount/data.data.total_amount)*100;
          this.comments = this.latestcampaign[0].number_of_like.length;
        },
        err => {
          load.dismiss();
          console.log(err);
        },
        ()=>{
          load.dismiss();
        console.log('Latest is ok!')
      }
      );

    this.httpprovider.getSliderImage().subscribe(
        response => {
          console.log(response)
          this.sliderImage = response.data;
          console.log(this.sliderImage)
        },
        err => {
          load.dismiss();
          console.log(err);
        },
        ()=>{
        console.log('Slider is ok!')
      }
      );
}

  Authentication(){
      this.navCtrl.push(SignPage);
  }

  like(campaign){
    console.log(campaign.campaign_id)
      let details = {
          campaign_id : campaign.campaign_id,
          user_id : 1,
      }

    this.httpprovider.postLike(details).then((result) => {

      this.likeIcon = 'danger';

    }, (err) => {
      console.log(err);
    }); 
  }

  moreDetail(campaign){
    this.navCtrl.push(AboutPage, {campaign:campaign});
  }

  commentPress(campaign){

    this.navCtrl.push(CommentPage, {campaign:campaign})
     // let myModal = this.modalCtrl.create(CommentPage, {campaign:campaign});

     // myModal.onDidDismiss(data => {
     //   console.log(data);
     //   if(data === true){
     //     this.ionViewDidLoad();
     //   }
     // });
     
     // myModal.present();
  
  }

  shareButton() {
   
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Social Sharing',
      buttons: [
        {
          text: 'Facebook',
          role: 'button',
          handler: () => {
             
                    let load = this.loading.create({
                      content: 'Please wait...'
                      });
                    load.present();
                   this.socialSharing.shareViaFacebook(this.latestcampaign)
                   .then((data) =>
                   {
                      console.log('Shared via Facebook');
                      load.dismiss();

                   })
                   .catch((err) =>
                   {
                     load.dismiss();
                     const toast = this.toast.create({
                        message: 'Not Shared via Fb',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                      console.log('Was not shared via Facebook');
                   });

            console.log('Destructive clicked');
          }
        },{
          text: 'Twitter',
          role: 'button',
          handler: () => {
                   let load = this.loading.create({
                     content: 'please wait...'
                   });

                   load.present();

                  this.socialSharing.shareViaTwitter(this.latestcampaign)
                  .then((data) =>
                  {
                    load.dismiss();
                     console.log('Shared via Twitter');
                  })
                  .catch((err) =>
                  {  
                    load.dismiss();
                    const toast = this.toast.create({
                        message: 'cannot shared via twitter',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                     console.log('Was not shared via Twitter');
                  });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
}

getRemainingDays(id){
  for (let campaign of this.latestcampaign){
              if (id === campaign["campaign_id"]){
             return (moment(campaign.campaign_end_date, "YYYYMMDD").lang("ms").fromNow());
           }
        }
  return null;
}


getComment(id){
  for (let campaign of this.latestcampaign){
              if (id === campaign["campaign_id"]){
             return (campaign.comments.length);
           }
        }
  return null;
}

getLike(id){
  for (let campaign of this.latestcampaign){
              if (id === campaign["campaign_id"]){
             return (campaign.number_of_like.length);
           }
        }
  return null;
}

getWidth(id){


  for (let campaign of this.latestcampaign){
              if (id === campaign["campaign_id"]){
             return (campaign["fund_amount"]/campaign["total_amount"]*300)+"px";
           }
        }
  return "0px";
}
}