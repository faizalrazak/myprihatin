import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import * as moment from 'moment';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage } from '../sign/sign'

@IonicPage()
@Component({
  selector: 'page-article-comment',
  templateUrl: 'article-comment.html',
})
export class ArticleCommentPage {

	comments:any;
  article:any;
  userComment:any;
  user_id: any;

  constructor(
    public alert:AlertController, 
    public auth:AuthProvider, 
    public httpProvider:HttpProvider, 
    public viewCtrl:ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loading:LoadingController
    )
  {
    this.user_id = window.localStorage.getItem('user_id')
  	this.article = this.navParams.get("article");
    this.comments = this.article.comments; 
  	console.log(this.comments);
  }

  getCommentTime(id){
    console.log(id)
    for (let comment of this.comments){
                if (id === comment["comment_id"]){
               return (moment(comment.created_at.date).startOf('second').lang("ms").fromNow());
             }
          }
    return null;
  }

  postComment(){
    let details = {
          article_id : this.article.article_id,
          user_id : this.user_id,
          comment : this.userComment
    }

    if(this.auth.isLogged() === true){

    let load = this.loading.create({
    content: 'Posting...'
    });

    load.present();
    
      this.httpProvider.articleComment(details).then((result) => {

        console.log(result)
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
  }
}
