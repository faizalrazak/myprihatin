import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email'

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile : any;

  editForm : FormGroup;

  constructor(public toast:ToastController, public formBuilder:FormBuilder, public httpprovider:HttpProvider, public loading:LoadingController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
      
      this.profile = navParams.get('profile');
      console.log(this.profile)

      this.editForm = formBuilder.group({
      name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      first_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      locale : ['', Validators.compose([ Validators.required])],
      email : ['', EmailValidator.isValid],
      birthdate : [''],
      phone_number : [''],
      address : [''],
      password : [''],
      // password : ['', Validators.compose([ Validators.minLength(8), Validators.required])],
      race : [''],
      gender : [''],
    });

  }

  ionViewDidLoad(){
    // let load = this.loading.create({
    //   content: 'Please wait...'
    //   });

    //     load.present();

    //     this.httpprovider.getUserProfile().subscribe(
    //         response => {
    //          console.log(response);
    //           this.profile = response.data[0];
    //           console.log(this.profile)
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
               const toast = this.toast.create({
                message: 'Profile Updated successfully',
                duration: 3000,
                position: 'middle'
              });
               toast.present();
            // console.log('register success');
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

  
  close(){
    this.viewCtrl.dismiss();
  }

}
