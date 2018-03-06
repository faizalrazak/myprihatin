import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, ModalController, ActionSheetController, ToastController} from 'ionic-angular';
import { ArticleCommentPage } from '../article-comment/article-comment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpProvider } from '../../providers/http/http';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage } from '../sign/sign'


@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {

	article_id :any;
  comments:any;
  likes:any;
  article:any;
  buttonIcon : string = 'ios-heart-outline';

  constructor(
    public toast:ToastController, 
    public actionSheet:ActionSheetController, 
    public socialSharing:SocialSharing, 
    public modalCtrl:ModalController, 
    public loading:LoadingController, 
    public viewCtrl:ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public httpprovider:HttpProvider,
    public alert:AlertController,
    private auth:AuthProvider
    )
  {

    

  	this.article_id = navParams.get('id');
  	console.log(this.article_id);

    
  }

  ionViewDidLoad(){

    let load = this.loading.create({
      content: 'Please wait...'
    });
    load.present();
    this.httpprovider.getArticle(this.article_id).subscribe(
          data => {
            this.article = data.data;
            console.log(this.article)
            this.comments = this.article.comments.length;
            console.log(this.comments)
            this.likes = this.article.number_of_like.length;
          },
          err => {
            load.dismiss();
            console.log(err);
          },
          ()=>{
            load.dismiss();
          console.log('Article is ok!')
        }
    );
  }
  
  likeArticle(id) {

     if(this.auth.isLogged() === true){
        let details = {
          article_id : id,
          user_id : window.localStorage.getItem('user_id'),
        }

        this.httpprovider.postArticleLike(details).then((result) => {
          
          this.ionViewDidLoad();

            const toast = this.toast.create({
              message: "Anda Menyukai Artikel ❤",
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

  deleteLike(id){

    this.httpprovider.deleteArticleLike(id).then((result) => {

      this.ionViewDidLoad();

      const toast = this.toast.create({
        message: "Anda Tidak Suka Artikel 💔",
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
    this.navCtrl.push(ArticleCommentPage, {id});
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
