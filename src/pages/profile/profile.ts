import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AboutUsPage } from '../about-us/about-us';
import { UserDetailsPage} from '../user-details/user-details';
import { HttpProvider } from '../../providers/http/http';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';
import { SignPage } from '../sign/sign';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile : any;
  activities:any;
  token:any;

  constructor(private auth:AuthProvider, public loading:LoadingController, public httpprovider:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
    this.token = window.localStorage.getItem('token');
    console.log(this.token);
  }

  ionViewDidLoad(){

    let load = this.loading.create({
       content: 'Please wait...'
    });

    load.present();

    this.httpprovider.getUser().then((data) => {
          this.profile = data;
          console.log(this.profile)
          load.dismiss()
    }, (err) => {
        console.log("not allowed");
        load.dismiss();
    });

    // let load = this.loading.create({
    //   content: 'Please wait...'
    //   });

    //     load.present();

    //     this.httpprovider.getUser().then((data)=>{
    //       this.profile = data;
    //       console.log('here');
    //       console.log(this.profile);
    //     },
    //     (err) => {
    //        console.log("not allowed");
    //     });


      //   this.httpprovider.getUserProfile().subscribe(
      //       response => {
      //        console.log(response);
      //         this.profile = response.data;
      //         this.activities = response.data.fund;
      //         console.log(this.activities)
      //       },
      //       err => {
      //         console.log(err);
      //         load.dismiss();
      //       },
      //       ()=>{
      //         load.dismiss()
      //       console.log('user profile revealed!')
      //     }
      // );

    //      let load = this.loading.create({
    //   content: 'Please wait...'
    //   });

    //     load.present();

    // this.storage.get('token').then((token)=>{

    //   console.log(token);
      
    //   this.httpprovider.getUserProfile(token).subscribe(
    //         response => {
    //          console.log(response);
    //           this.profile = response.data;
    //           this.activities = response.data.fund;
    //           console.log(this.activities)
    //         },
    //         err => {
    //           console.log(err);
    //           load.dismiss();
    //         },
    //         ()=>{
    //           load.dismiss()
    //         console.log('user profile revealed!')
    //       }
    //   );
    // });
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
    this.navCtrl.push(SignPage);
  }


}
