import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import * as moment from 'moment';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage } from '../sign/sign'
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

	comments:any;
  article:any;
  userComment:any;

  constructor(public alert:AlertController, public auth:AuthProvider, public httpProvider:HttpProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public loading:LoadingController) {

  	this.article = this.navParams.get("article");
    this.comments = this.article.comments;
  	console.log(this.comments);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleCommentPage');
  }

  getCommentTime(id){
    for (let comment of this.comments){
                if (id === comment["comment_id"]){
               return (moment(comment.created_at.date).startOf('day').lang("ms").fromNow());
             }
          }
    return null;
  }

  postComment(){
    let details = {
          article_id : this.article.article_id,
          user_id : 1,
          comment : this.userComment
    }

    if(this.auth.isLogged() === true){

    let load = this.loading.create({
    content: 'Posting...'
    });

    load.present();

      this.httpProvider.articleComment(details).then((result) => {

        load.dismiss();
        this.viewCtrl.dismiss(true);

      }, (err) => {

        console.log(err);
        load.dismiss();

      });  
    }else{
      let alert = this.alert.create({
              title : "Comment Failed",
              message : "You must login first",
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

    //  let load = this.loading.create({
    //   content: 'Posting...'
    //   });

    //  load.present();

    // this.httpProvider.articleComment(details).then((result) => {

    //   load.dismiss();
    //   this.viewCtrl.dismiss(true);

    // }, (err) => {

    //   console.log(err);
    //   load.dismiss();

    // });

  }

}
