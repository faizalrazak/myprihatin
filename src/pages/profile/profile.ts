import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AboutUsPage } from '../about-us/about-us';
import { UserDetailsPage} from '../user-details/user-details';
import { HttpProvider } from '../../providers/http/http';
import * as moment from 'moment';

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

  constructor(public loading:LoadingController, public httpprovider:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
  }

  ionViewDidLoad(){
    let load = this.loading.create({
      content: 'Please wait...'
      });

        load.present();

        this.httpprovider.getUserProfile().subscribe(
            response => {
             console.log(response);
              this.profile = response.data;
              this.activities = response.data.fund;
              console.log(this.activities)
            },
            err => {
              console.log(err);
              load.dismiss();
            },
            ()=>{
              load.dismiss()
            console.log('user profile revealed!')
          }
      );

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
    let myModal = this.modalCtrl.create(UserDetailsPage, {profile:profile});
    myModal.present();
  }



}
