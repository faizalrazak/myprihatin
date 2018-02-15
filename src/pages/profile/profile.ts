import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AboutUsPage } from '../about-us/about-us';
import { UserDetailsPage} from '../user-details/user-details';
import { HttpProvider } from '../../providers/http/http';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';
import { HomePage } from '../home/home';
import { SignPage } from '../sign/sign';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile : any;
  activities:any;
  fund : number;
  token:any;
  image: any;

  constructor(
    private auth:AuthProvider, 
    public loading:LoadingController, 
    public httpprovider:HttpProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController)
  {

    this.image = "assets/user.png"

    this.token = window.localStorage.getItem('token');

    if(this.auth.isLogged() === false){
      this.navCtrl.setRoot(SignPage);
    }

    console.log(this.token);
  }

  ionViewDidLoad(){

    let load = this.loading.create({
       content: 'Please wait...'
    });

    load.present();

    this.httpprovider.getUser().then((data) => {
      this.profile = data;
      window.localStorage.setItem('user_id', this.profile.user_id);
      this.activities = this.profile.fund
      console.log(this.activities)

      this.fund = 0;
          
      for (let i = 0; i < this.activities.length; i++){
        this.fund += this.activities[i].amount
      }

          load.dismiss()
    },(err) => {
      console.log("not allowed");
      load.dismiss();
    });
  }

  totalFund(fund){
    console.log(fund.length)

    if(fund.length > 1){
      for(let i of fund.length){
        this.fund += fund[i].amount;
        console.log(this.fund);
      }
      return this.fund;
    }
    return 0;
  }
  
  aboutUs(){
    let myModal = this.modalCtrl.create(AboutUsPage);
    myModal.present();
  }

  userDetails(profile){
    this.navCtrl.push(UserDetailsPage, {profile:profile});
  }


  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(HomePage);
  }
  
}
