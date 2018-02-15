import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SignPage } from '../sign/sign';
import { ProfilePage} from '../profile/profile';
import { PasswordValidator } from '../../validators/password-validator';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  emailForm : FormGroup
  matching_passwords_group: FormGroup;
  validation_messages: any;

  constructor(
    public alertCtrl:AlertController,
    private loading:LoadingController,
    private auth:AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder:FormBuilder
    ){

  }

  ionViewWillLoad() {

    this.emailForm = this.formBuilder.group({

      email: new FormControl('', 
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.[a-z]+$')
      ])
      ),
    });

    this.validation_messages = {
      
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Enter a valid email.' }
      ]
    };
  }

  sendEmail(){

    if(!this.emailForm.valid){
      console.log("error");
    }else{

          let details = this.emailForm.value;
          console.log(details);

          let load = this.loading.create({
          content: 'Please wait...'
          });

            load.present();

            this.auth.forgotPassword(details).then(result => {
              console.log(result)
              if(result == "ok"){
                this.navCtrl.setRoot(ProfilePage);
              }else{
                let alert = this.alertCtrl.create({
                  title : "No data in server",
                  subTitle : "Invalid email",
                  buttons : ['OK']
                })
                alert.present();
              }
            load.dismiss();
        }, 
          (err) => {
              console.log(err);
              load.dismiss();

              let alert = this.alertCtrl.create({
                title : "No data in server",
                subTitle : "Invalid email",
                buttons : ['OK']
              })
              alert.present();
        });
    }
  }

}
