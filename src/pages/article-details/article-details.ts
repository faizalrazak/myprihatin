import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { ArticleCommentPage } from '../article-comment/article-comment';

/**
 * Generated class for the ArticleDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {

	details :any;

  constructor(public modalCtrl:ModalController, public loading:LoadingController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

     let load = this.loading.create({
      content: 'Please wait...'
      });

     load.present();
  	this.details = navParams.get('article');
  	console.log(this.details);
    load.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailsPage');
  }

  commentsTapped(details){

    let myModal = this.modalCtrl.create(ArticleCommentPage, details);

    myModal.onDidDismiss(data => {
       
      if(data == true){
       this.ionViewDidLoad();
      }

    });
    myModal.present();

  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }

}
