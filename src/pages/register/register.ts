import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { HttpProvider } from '../../providers/http/http';
import { PasswordValidator } from '../../validators/password-validator';
import { SignPage } from '../sign/sign';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	registerForm : FormGroup;
  matching_passwords_group: FormGroup;
  validation_messages: any;

  constructor(
    public viewCtrl:ViewController,
    public toast:ToastController,
    public loading:LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public httpprovider:HttpProvider
    ){
  }

  ionViewWillLoad() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.registerForm = this.formBuilder.group({
      name: new FormControl('', 
      Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])),

      email: new FormControl('', 
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-z]+.[a-z]+$')
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+?\.[a-z]{2,3}$')
      ])),

      matching_passwords: this.matching_passwords_group,

    });

    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 8 characters long.' },
        { type: 'pattern', message: 'Must contain at least one uppercase, lowercase, number and symbol' }
      ],
      'confirm_password': [
        { type: 'required', message: 'Confirm password is required' }
      ],
      'matching_passwords': [
        { type: 'areEqual', message: 'Password mismatch' }
      ],
    };
  }

  register(){

    if(!this.registerForm.valid){
    }
    else {

      let details = {
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.matching_passwords.password
      }

      let load = this.loading.create({
        content: 'Please wait...'
      });
      
        load.present();

        console.log(details);
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
}
