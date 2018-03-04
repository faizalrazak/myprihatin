import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/Storage';
import * as moment from 'moment';
import { AuthProvider } from '../../providers/auth/auth';
import { SignPage } from '../sign/sign';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comments : any;
  commentTime : any;
  userComment = "";
  comment_length;
  id:any;
  user:any;
  token:any;
  user_id: any;
  user_image = "assets/user.png";


  constructor(
    private alert:AlertController,
    private auth:AuthProvider,
    private storage:Storage,
    public toast:ToastController,
    public loading:LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpprovider:HttpProvider,
    public viewCtrl:ViewController
    )
  {
    this.user_id = window.localStorage.getItem('user_id');

    
  }

  ionViewDidLoad(){
    let load = this.loading.create({
      content: 'Tunggu Sebentar...'
    });

        load.present();
        this.id = this.navParams.get('id');
        console.log(this.id)

        this.httpprovider.getCampaignComment(this.id).subscribe(
          data => {
            this.comments = data.data;
            this.comment_length = this.comments.length
            console.log(this.comments)
          },
          err => {
            load.dismiss();
            console.log(err);
          },
          ()=>{
            load.dismiss();
          console.log('Campaign is ok!')
        });
  }

  getCommentTime(id){
    for (let comment of this.comments){
                if (id === comment["id"]){
                  this.commentTime = (moment(comment.created_at.date).startOf('second').lang("ms").fromNow())
                  this.commentTime = this.commentTime.replace('yang ','');
               return this.commentTime;
             }
          }
    return null;
  }

  sendComment(){

    let details = {
          campaign_id : this.id,
          user_id : this.user_id,
          title : 'this is my comment',
          desc : this.userComment,
    }

    if(this.auth.isLogged() === true){

    let load = this.loading.create({
    content: 'Tunggu Sebentar...'
    });

      if(details.desc == ""){
        const toast = this.toast.create({
          message: 'Sila isi komen anda',
          duration: 3000,
          position: 'bottom'
        });      
        
        toast.present(); 
      }else{

        load.present();

        this.httpprovider.postComment(details).then((result) => {
          this.ionViewDidLoad();
          load.dismiss();

        }, (err) => {

          console.log(err);
          load.dismiss();

        });

      }
  
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
