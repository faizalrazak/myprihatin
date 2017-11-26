import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	registerForm : FormGroup;

  constructor(public viewCtrl:ViewController, public toast:ToastController, public loading:LoadingController, public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public httpprovider:HttpProvider) {

  	this.registerForm = formBuilder.group({
  		name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  		email : ['', EmailValidator.isValid],
  		password : ['', Validators.compose([ Validators.minLength(8), Validators.required])],
      confirmPassword : ['', Validators.compose([ Validators.required])]
  	
  	},{validator: this.matchingPasswords('password', 'confirmPassword')}
   );
  }

matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

  register(){

    if(!this.registerForm.valid){
        // console.log(this.registerForm.value);
    }
    else {

          let details = this.registerForm.value;

          let load = this.loading.create({
          content: 'Please wait...'
          });

          load.present();

          this.httpprovider.register(details).then((result) => {
            load.dismiss();
               const toast = this.toast.create({
                message: 'Account created successfully',
                duration: 3000,
                position: 'middle'
              });
              
              toast.present();
              
              this.viewCtrl.dismiss();
        },
          (err) => {
          console.log(err);
      });
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
