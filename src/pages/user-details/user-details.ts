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
  gender: any;
  phone_number: any;
  birthday:any;
  locale:any;
  name:any;
  email:any;
  address:any;

  constructor(
    public modalCtrl:ModalController, 
    public navCtrl: NavController,
    public viewCtrl:ViewController, 
    public navParams: NavParams)
  {
    this.image = "assets/user.png"

  	this.profile = navParams.get('profile');
    this.gender = this.profile.gender
    this.phone_number = this.profile.phone_number
    this.birthday = this.profile.birthdate
    this.locale = this.profile.locale
    this.name = this.profile.name
    this.email = this.profile.email
    this.address = this.profile.address

  }

  editProfile(profile){
    this.navCtrl.push(EditProfilePage, {profile:profile});
  }

}
