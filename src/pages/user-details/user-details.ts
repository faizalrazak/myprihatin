import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile'

/**
 * Generated class for the UserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

profile:any;
  constructor(public modalCtrl:ModalController, public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {
  
  	this.profile = navParams.get('profile');
    console.log(this.profile)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }

  editProfile(profile){
    let myModal = this.modalCtrl.create(EditProfilePage, {profile:profile});
    myModal.present();
  }

}
