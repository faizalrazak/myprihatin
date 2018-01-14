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
  page = 1;
	slideLength : boolean = false;
  comments : any;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public toast:ToastController, public loading:LoadingController, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public modalCtrl:ModalController, public httpprovider:HttpProvider, public navParams:NavParams, public socialSharing:SocialSharing) {
     
    
  }

  ionViewDidLoad(){
    this.getCampaigns();
    this.httpprovider.getSliderImage().subscribe(
        response => {
          console.log(response)
          this.sliderImage = response.data;
          console.log(this.sliderImage)
        },
        err => {
         // load.dismiss();
          console.log(err);
        },
        ()=>{
        console.log('Slider is ok!')
      }
      );
}
doInfinite(infiniteScroll){
  console.log("here");
  this.page = this.page+1;
  setTimeout(() => {
    this.httpprovider.getLatest(this.page)
       .subscribe(
         res => {

           this.perPage = res.per_page;
           this.totalData = res.total;
           this.totalPage = res.total/3;
           for(let i=0; i<res.data.length; i++) {
             this.latestcampaign.push(res.data[i]);
           }
         },
         error =>console.log("error"));

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 1000);

}

getCampaigns(){
  let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();

        this.httpprovider.getLatest(this.page).subscribe(
        data => {
          console.log(data)

          this.latestcampaign = data.data;
    
         this.perPage = 3;
         this.totalData = data.total;
         this.totalPage = data.total/3;
          console.log(this.latestcampaign)
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
                this.remainingDays = (moment(campaign.campaign_end_date, "YYYYMMDD").lang("ms").fromNow())
                this.remainingDays = this.remainingDays.replace('dalam ','');
             return this.remainingDays;
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