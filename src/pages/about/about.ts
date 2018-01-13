import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController, ModalController, LoadingController, ToastController} from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { UpdatePage } from '../update/update';
import { DetailsPage } from '../details/details';
import { PaymentPage } from '../payment/payment';
import { HttpProvider } from '../../providers/http/http';
import { ImageViewerController } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment'; 

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  buttonIcon : string = 'ios-heart-outline'
  campaign:any;
  kempen :any;
  commentBadge : any;
  newsBadge : any;
  remainingDays:any;
  percentage:any;
  progressbar : any;
  like : any;
	moreImg = [{image: "assets/img/health.jpg"} , {image: "assets/img/qurban.jpg"} , {image: "assets/img/bantu.jpg"}];

  items = [];

  image:any;
  dropdt:any;
  pickdt:any;
  remDay:number;
  totalDay:any;

  constructor(public toast:ToastController, public actionSheetCtrl: ActionSheetController, public imgViewer:ImageViewerController, public loading:LoadingController, public modalCtrl:ModalController, public navParams:NavParams, public navCtrl: NavController , public viewCtrl: ViewController, public httpprovider:HttpProvider, public socialSharing:SocialSharing) {

    this.campaign = navParams.get('campaign');
    console.log(this.campaign);

    this.remainingDays = moment(this.campaign.campaign_end_date, "YYYYMMDD").lang("ms").fromNow();
    console.log(this.remainingDays);
    this.totalDay = this.remainingDays.replace('dalam ','');
    console.log(this.totalDay)
    this.percentage = (this.campaign.fund_amount/this.campaign.total_amount)*100;
    this.progressbar = ((this.campaign.fund_amount/this.campaign.total_amount)*300)+"px";
    this.like = this.campaign.number_of_like.length;
    this.commentBadge = this.campaign.comments.length;
    this.newsBadge = this.campaign.news.length;
    this.image = this.campaign.campaign_image;

    // this.dropdt = new Date(Date.now());
    // this.pickdt = new Date(this.campaign.campaign_end_date);
    // this.remDay = (this.pickdt - this.dropdt) / (24 * 3600 * 1000);
    // console.log(this.remDay);

    // if(this.remDay > 30 && this.remDay < 365){
    //   this.totalday = this.remDay / 30;
    //   console.log(this.totalday);
    // }else if(this.remDay > 365){
    //   this.totalday = this.remDay / 365;
    //     if(this.totalday > 12){
    //       this.totalday = this.totalday / 12;
    //       console.log(this.totalday);
    //     }else{
    //       console.log(this.totalday);
    //     }
    // }else{
    //   console.log(this.remDay);
    // }
  }

  dateDifference() {
    this.dropdt = new Date(Date.now());
    this.pickdt = new Date(this.campaign.campaign_end_date);
    this.remDay = (this.dropdt - this.pickdt) / (24 * 3600 * 1000);
    console.log(this.remDay);

    if(this.remDay > 30){
      this.remDay = Math.floor(this.remDay / 30);
      return this.remDay;
    }else if(this.remDay > 365){
      this.remDay = Math.floor(this.remDay / 365);
      return this.remDay;
    }else{
      return this.remDay;
    }
}

  ionViewDidLoad(){
  }

  imageTapped(image){
    this.image = image;

  }

  toggleIcon(getIcon: string) {

    let details = {
          campaign_id : this.campaign.campaign_id,
          user_id : 1,
    }

    this.httpprovider.postLike(details).then((result) => {

      if (this.buttonIcon === 'heart') {

       this.buttonIcon = "ios-heart-outline";
        
      }
      else if (this.buttonIcon === 'ios-heart-outline') {
        
        this.buttonIcon = "heart";
      }
          
    },
    (err) => {
        console.log(err);
    });

      
   }


  commentsTapped(campaign){

    this.navCtrl.push(CommentPage, {campaign:this.campaign});
  }

  newsTapped(campaign){
    
    this.navCtrl.push(UpdatePage, this.campaign);
  }

  details(campaign){
    
    this.navCtrl.push(DetailsPage, {campaign:this.campaign});
  }

  donate(campaign){

    this.navCtrl.push(PaymentPage, {campaign:this.campaign});
  }

  sebar() {
   
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
                   this.socialSharing.shareViaFacebook('http://www.myprihatin.org.my/')
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

                  this.socialSharing.shareViaTwitter('http://www.myprihatin.org.my/')
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
}
