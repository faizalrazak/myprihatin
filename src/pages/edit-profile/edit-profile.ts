import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { ProfilePage } from '../profile/profile'

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile : any;
  genders: any
  editForm : FormGroup;

  constructor(
    public toast:ToastController, 
    public formBuilder:FormBuilder, 
    public httpprovider:HttpProvider, 
    public loading:LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController
    )
  {
      
      this.profile = navParams.get('profile');
      console.log(this.profile)

      this.genders = [
        "Male",
        "Female"
      ];
  }

  ionViewWillLoad(){

    this.editForm = this.formBuilder.group({
      name: new FormControl('',
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.required
      ])),

      first_name: new FormControl(''),

      last_name: new FormControl(''),

      race : new FormControl(''),

      birthdate: new FormControl(''),

      locale: new FormControl(''),

      address: new FormControl('',
        Validators.compose([
          Validators.maxLength(200),
      ])),

      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      phone_number: new FormControl('',
        Validators.compose([
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(5),
          Validators.maxLength(20)
      ])),

      gender: new FormControl(''),

      user_id : this.profile.user_id

    });
  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
  }

  save(){

    if(!this.editForm.valid){
          // console.log(this.registerForm.value);
      }
      else {
            console.log("success!")
            // console.log(this.registerForm.value);

            let details = this.editForm.value;
            console.log(details);

            let load = this.loading.create({
            content: 'Please wait...'
            });

            load.present();

            this.httpprovider.updateUser(details).then((result) => {
              load.dismiss();

              this.navCtrl.push(ProfilePage);
                 const toast = this.toast.create({
                  message: 'Profile Updated successfully',
                  duration: 3000,
                  position: 'middle'
                });
                 toast.present();
          },
            (err) => {

               const toast = this.toast.create({
                  message: 'Profile Not Updated',
                  duration: 3000,
                  position: 'middle'
                });

               toast.present();

              load.dismiss();
            console.log(err);
        });
      }
  }
}
