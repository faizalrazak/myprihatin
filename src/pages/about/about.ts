import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController, ModalController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { UpdatePage } from '../update/update';
import { DetailsPage } from '../details/details';
import { PaymentPage } from '../payment/payment';
import { HttpProvider } from '../../providers/http/http';
import { ImageViewerController } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage } from '../sign/sign';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  buttonIcon : string = 'ios-heart-outline'
  campaign:any;
  campaign_id:any;
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
  isLike:any;

  constructor(
    public toast:ToastController, 
    public actionSheetCtrl: ActionSheetController,
    public imgViewer:ImageViewerController,
    public loading:LoadingController,
    public modalCtrl:ModalController,
    public navParams:NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public httpprovider:HttpProvider,
    public socialSharing:SocialSharing,
    public alert:AlertController,
    private auth:AuthProvider
    )
  {   

  this.campaign_id = navParams.get('id');
  console.log(this.campaign_id)
    
  }

  ionViewDidLoad(){
    let load = this.loading.create({
        content: 'Please wait...'
        });

          load.present();

          this.httpprovider.getCampaign(this.campaign_id).subscribe(
          data => {
            this.campaign = data.data;
            console.log(this.campaign)
            this.remainingDays = moment(this.campaign.campaign_end_date, "YYYYMMDD").lang("ms").fromNow();
            this.totalDay = this.remainingDays.replace('dalam ','');
            this.percentage = Math.round((this.campaign.fund_amount/this.campaign.total_amount)*100);
            this.progressbar = ((this.campaign.fund_amount/this.campaign.total_amount)*300)+"px";
            this.like = this.campaign.number_of_like.length;
            this.commentBadge = this.campaign.campaign_comments.length;
            this.newsBadge = this.campaign.campaign_news.length;
            this.image = this.campaign.campaign_image;
            this.isLike = this.campaign.like;
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

  imageTapped(image){
    this.image = image;

  }

  likeCampaign(campaign_id) {

      if(this.auth.isLogged() === true){
      let details = {
            campaign_id : this.campaign.campaign_id,
            user_id : window.localStorage.getItem('user_id'),
      }

      this.httpprovider.postLike(details).then((result) => {

        this.ionViewDidLoad();

        const toast = this.toast.create({
          message: "Anda Menyukai Kempen ❤",
          duration: 3000,
          position: 'middle'
        });      
        
        toast.present();
      },
      (err) => {console.log(err)});
    }else{
      let alert = this.alert.create({
              title : "Need to login",
              buttons : [
                {
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.push(SignPage);
                  }
                },
                {
                  text: 'Cancel',
                  handler: () => {
                    console.log('cancel clicked')
                  }
                }
              ]
        });

      alert.present();
    }
  }

  deleteLike(campaign_id){
    this.httpprovider.deleteLike(campaign_id).then((result) => {

        this.ionViewDidLoad();

        const toast = this.toast.create({
          message: "Anda Tidak Suka Kempen 💔",
          duration: 3000,
          position: 'middle'
        });      
        
        toast.present();
        
      },(err) => {
        const toast = this.toast.create({
          message: err,
          duration: 3000,
          position: 'bottom'
        });      
        
        toast.present();
      }); 
  }


  commentsTapped(id){
    this.navCtrl.push(CommentPage, {id});
  }

  newsTapped(id){
    this.navCtrl.push(UpdatePage, {id});
  }

  details(campaign){
    this.navCtrl.push(DetailsPage, {campaign});
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
