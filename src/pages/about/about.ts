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

  constructor(public toast:ToastController, public actionSheetCtrl: ActionSheetController, public imgViewer:ImageViewerController, public loading:LoadingController, public modalCtrl:ModalController, public navParams:NavParams, public navCtrl: NavController , public viewCtrl: ViewController, public httpprovider:HttpProvider, public socialSharing:SocialSharing) {

    this.campaign = navParams.get('campaign');
    console.log(this.campaign);

    this.remainingDays = moment(this.campaign.campaign_end_date, "YYYYMMDD").lang("ms").fromNow();
    this.percentage = (this.campaign.fund_amount/this.campaign.total_amount)*100;
    this.progressbar = ((this.campaign.fund_amount/this.campaign.total_amount)*300)+"px";
    console.log(this.remainingDays);
    this.like = this.campaign.number_of_like.length;
    this.commentBadge = this.campaign.comments.length;
    this.newsBadge = this.campaign.news.length;
    this.image = this.campaign.campaign_image;
  }

  ionViewDidLoad(){
  }

  imageTapped(image){
    this.image = image;

  }

  toggleIcon(getIcon: string) {

      if (this.buttonIcon === 'heart') {
        this.buttonIcon = "ios-heart-outline";
      }
      else if (this.buttonIcon === 'ios-heart-outline') {
        this.buttonIcon = "heart";
      }
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
                   this.socialSharing.shareViaFacebook(this.campaign)
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

                  this.socialSharing.shareViaTwitter(this.campaign)
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
