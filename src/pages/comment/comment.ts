import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/Storage';
import * as moment from 'moment'; 

/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comments : any;
  commentTime : any;
  userComment = '';
  campaign:any;
  user:any;
  token:any;


  constructor(private storage:Storage, public loading:LoadingController, public navCtrl: NavController, public navParams: NavParams, public httpprovider:HttpProvider, public viewCtrl:ViewController) {
    
    this.token = this.storage.get('token');
    console.log(this.token)

    let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();
        this.campaign = navParams.get('campaign');
        this.comments = this.campaign.comments;
        load.dismiss();
  }

  getCommentTime(id){
    for (let comment of this.comments){
                if (id === comment["id"]){
                  this.commentTime = (moment(comment.created_at.date).startOf('day').lang("ms").fromNow())
                  this.commentTime = this.commentTime.replace('yang ','');
                  console.log(this.commentTime)
               return this.commentTime;
             }
          }
    return null;
  }

   sendComment(){

    let details = {
          campaign_id : this.campaign.campaign_id,
          user_id : 1,
          title : 'this is my comment',
          desc : this.userComment
    }

     let load = this.loading.create({
      content: 'Posting...'
      });

     load.present();

    this.httpprovider.postComment(details).then((result) => {

      load.dismiss();
      this.viewCtrl.dismiss(true);

    }, (err) => {

      console.log(err);
      load.dismiss();

    });  
  }
}
