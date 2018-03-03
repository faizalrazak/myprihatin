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
  article_id:any;
  user_image = "assets/user.png";
  comment_length;

  constructor(
    public alert:AlertController, 
    public auth:AuthProvider, 
    public httpprovider:HttpProvider, 
    public viewCtrl:ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loading:LoadingController
    )
  {
    this.user_id = window.localStorage.getItem('user_id')
  	this.article_id = this.navParams.get("id");
    // this.comments = this.article.comments; 
  	console.log(this.article_id);
  }

  ionViewDidLoad(){
    let load = this.loading.create({
      content: 'Please wait...'
    });

    load.present();
    this.httpprovider.getArticleComment(this.article_id).subscribe(
          data => {
            this.comments = data.data;
            this.comment_length = this.comments.length
          },
          err => {
            load.dismiss();
            console.log(err);
          },
          ()=>{
            load.dismiss();
          console.log('comments is ok!')
        }
    );
  }

  getCommentTime(id){
    for (let comment of this.comments){
                if (id === comment["comment_id"]){
               return (moment(comment.created_at.date).startOf('second').lang("ms").fromNow());
             }
          }
    return null;
  }

  postComment(){
    let details = {
          article_id : this.article_id,
          user_id : this.user_id,
          comment : this.userComment
    }

    if(this.auth.isLogged() === true){

    let load = this.loading.create({
    content: 'Posting...'
    });

    load.present();
    
      this.httpprovider.articleComment(details).then((result) => {

        this.ionViewDidLoad();
        load.dismiss();

      }, (err) => {

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
