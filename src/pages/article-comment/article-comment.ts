import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ArticleCommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-comment',
  templateUrl: 'article-comment.html',
})
export class ArticleCommentPage {

	comment:any;

  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  	this.comment = this.navParams.get("article");
  	console.log(this.comment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleCommentPage');
  }

  closeModal(){
  	this.viewCtrl.dismiss(false);
  }

}
