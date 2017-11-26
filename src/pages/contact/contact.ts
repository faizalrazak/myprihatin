import { Component } from '@angular/core';
import { NavController, ModalController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ArticleDetailsPage } from '../article-details/article-details';
import { ArticleCommentPage } from '../article-comment/article-comment';
import { HttpProvider } from '../../providers/http/http'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	articles :any;

  constructor(public loading:LoadingController, public toast:ToastController, public platform:Platform, public actionSheet:ActionSheetController, public socialSharing:SocialSharing, public navCtrl: NavController, public modalCtrl:ModalController, public httpprovider:HttpProvider) {

  }

  ionViewDidLoad(){

     let load = this.loading.create({
      content: 'Please wait...'
      });

     load.present();

  	this.httpprovider.getArticle().subscribe(
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

  details(article){
    let myModal = this.modalCtrl.create(ArticleDetailsPage, {article:article});
    myModal.present();
  
  }

  commentPress(article){
    let myModal = this.modalCtrl.create(ArticleCommentPage, {article:article});

    myModal.onDidDismiss(data => {
       
      if(data == true){
       this.ionViewDidLoad();
      }

    });
    myModal.present();
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

}
