import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, ActionSheetController, ToastController} from 'ionic-angular';
import { ArticleCommentPage } from '../article-comment/article-comment';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {

	article :any;
  comments:any;
  likes:any;

  constructor(public toast:ToastController, public actionSheet:ActionSheetController, public socialSharing:SocialSharing, public modalCtrl:ModalController, public loading:LoadingController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

     let load = this.loading.create({
      content: 'Please wait...'
      });

     load.present();
  	this.article = navParams.get('article');
  	console.log(this.article);
    this.comments = this.article.comments.length;
    this.likes = this.article.number_of_like.length;
    load.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailsPage');
  }

  commentsTapped(article){

    this.navCtrl.push(ArticleCommentPage, {article:this.article});

    // let myModal = this.modalCtrl.create(ArticleCommentPage, details);

    // myModal.onDidDismiss(data => {
       
    //   if(data == true){
    //    this.ionViewDidLoad();
    //   }

    // });
    // myModal.present();

  }

  shareButton() {

    let actionSheet = this.actionSheet.create({
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
                   this.socialSharing.shareViaFacebook(this.article)
                   .then((data) =>
                   {
                     // const toast = this.toast.create({
                     //    message: 'shared via fb',
                     //    duration: 3000,
                     //    position: 'middle'
                     //  });
                     //   toast.present();
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
                  content: 'Please wait...'
                  }); 

                   load.present();
                  this.socialSharing.shareViaTwitter(this.article)
                  .then((data) =>
                  {
                     console.log('Shared via Twitter');
                     load.dismiss();
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

                  console.log('Archive clicked');
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
