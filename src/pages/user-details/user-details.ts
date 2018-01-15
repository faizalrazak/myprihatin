import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile'

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  profile:any;
  image: any;

  constructor(
    public modalCtrl:ModalController, 
    public navCtrl: NavController,
    public viewCtrl:ViewController, 
    public navParams: NavParams)
  {
    this.image = "assets/user.png"

  	this.profile = navParams.get('profile');
    console.log(this.profile)

  }

  editProfile(profile){
    this.navCtrl.push(EditProfilePage, {profile:profile});
  }

}
