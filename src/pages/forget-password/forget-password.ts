import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignPage } from '../sign/sign';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  emailForm : FormGroup

  constructor(public alertCtrl:AlertController, private loading:LoadingController, private auth:AuthProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {
  
    this.emailForm = formBuilder.group({
      email : ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });

  }

  ionViewDidLoad() {
     
  }

  sendEmail(){

    if(!this.emailForm.valid){
      console.log("error");
    }else{

          let details = this.emailForm.value;
          // console.log(details);

          let load = this.loading.create({
          content: 'Please wait...'
          });

            load.present();

            this.auth.login(details).then(result => {
            this.navCtrl.setRoot(SignPage);
            load.dismiss();
        }, 
          (err) => {
              console.log(err);
              load.dismiss();

              let alert = this.alertCtrl.create({
                title : "No data in server",
                subTitle : err._body,
                buttons : ['OK']
              })
              alert.present();
        });
    }
  }

  

}
