import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
import { RegisterPage } from '../register/register';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import { ForgetPasswordPage } from '../forget-password/forget-password'
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the SignPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

  loginForm : FormGroup;
  response: any;

  constructor(public alertCtrl :AlertController, public toast:ToastController, public authprovider:AuthProvider, public loading:LoadingController, public viewCtrl:ViewController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, private fb:Facebook, public formBuilder:FormBuilder) {
    
    if(this.authprovider.isLogged() === false){
      
    }else{
      this.navCtrl.setRoot(ProfilePage);
    }

    this.loginForm = formBuilder.group({
      email : ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password : ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
  }

  facebookConnect(){

    let load = this.loading.create({
          content: 'Please wait...'
          });

  	this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse ) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', [])
      .then(profile => {
        console.log(profile)
        this.response = {
                         email: profile['email'],
                         password : profile['id'],
                         first_name: profile['first_name'],
                         picture: profile['picture']['data']['url'],
                         name: profile['name']
                       }
         load.present()
      this.authprovider.loginFacebook(this.response).then(result => {

          this.navCtrl.setRoot(ProfilePage);
          load.dismiss()
          }, 
          (err) => {
              console.log(err);
              load.dismiss();

              let alert = this.alertCtrl.create({
                title : "Login Facebook Failed",
                subTitle : err,
                buttons : ['OK']
              })
              alert.present();
        });

      });
    })
    .catch(e => console.log('Error logging into Facebook', e));



  }

  register(){
      this.navCtrl.push(RegisterPage);
    }


  login(){

    if(!this.loginForm.valid){
      console.log("error");
    }else{

          let details = this.loginForm.value;
          // console.log(details);

          let load = this.loading.create({
          content: 'Please wait...'
          });

            load.present();

            this.authprovider.login(details).then(result => {
            this.navCtrl.setRoot(ProfilePage);
            load.dismiss();
        }, 
          (err) => {
              console.log(err);
              load.dismiss();

              let alert = this.alertCtrl.create({
                title : "Login Failed",
                subTitle : err._body,
                buttons : ['OK']
              })
              alert.present();
              // const toast = this.toast.create({
              //   message: 'Login Fail',
              //   duration: 3000,
              //   position: 'middle'
              // });
              //  toast.present();
        });
    }
  }

  forgetPassword(){
    this.navCtrl.push(ForgetPasswordPage);    
  }

}
