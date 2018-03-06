import { Component } from '@angular/core';
import { NavController, ModalController, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ArticleDetailsPage } from '../article-details/article-details';
import { ArticleCommentPage } from '../article-comment/article-comment';
import { HttpProvider } from '../../providers/http/http'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage} from '../sign/sign'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	articles :any;

  constructor(
    public loading:LoadingController,
    public toast:ToastController,
    public platform:Platform,
    public actionSheet:ActionSheetController,
    public socialSharing:SocialSharing,
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public httpprovider:HttpProvider,
    public alert:AlertController,
    private auth:AuthProvider
    ) {
  }

  ionViewDidLoad(){

    let load = this.loading.create({
      content: 'Please wait...'
    });

    load.present();

  	this.httpprovider.getAllArticle().subscribe(
      response => {
        console.log(response)
        this.articles = response.data;
        console.log(this.articles)
        console.log('sini')
      },
      err => {
        console.log(err);
        load.dismiss();
      },
      ()=>{
      console.log('Article is ok!')
      load.dismiss();
    }
    );
  }

  like(id){

    if(this.auth.isLogged() === true){
      let details = {
            article_id : id,
            user_id : window.localStorage.getItem('user_id'),
        }

      this.httpprovider.postArticleLike(details).then((result) => {

        this.ionViewDidLoad();

      }, (err) => {
        console.log(err);
      });  
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

  deleteLike(id){

    this.httpprovider.deleteArticleLike(id).then((result) => {

        this.ionViewDidLoad();

      }, (err) => {
        console.log(err);
      });
  }

  details(id){
   this.navCtrl.push(ArticleDetailsPage, {id});
  }

  commentPress(id){
    this.navCtrl.push(ArticleCommentPage, {id})
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
                   this.socialSharing.shareViaFacebook(this.articles)
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
                  content: 'Please wait...'
                  }); 

                   load.present();
                  this.socialSharing.shareViaTwitter(this.articles)
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

  getComment(id){
    for (let article of this.articles){
                if (id === article["article_id"]){
               return (article.comments.length);
             }
          }
    return null;
  }

  getLike(id){
    for (let article of this.articles){
                if (id === article["article_id"]){
               return (article.number_of_like.length);
             }
          }
    return null;
  }

}
