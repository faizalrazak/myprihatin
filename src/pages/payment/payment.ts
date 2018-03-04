import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController, AlertController} from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SignPage } from '../sign/sign';
import { Storage } from '@ionic/Storage';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

	public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  value : number = 0;
  campaign : any;
  token : any;
  
  constructor(
    public alertCtrl:AlertController,
    public auth:AuthProvider,
    private storage:Storage,
    public iab:InAppBrowser,
    public modalCtrl:ModalController,
    public toast:ToastController,
    public httpProvider:HttpProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl : ViewController
    )
  {    
    this.token =  window.localStorage.getItem('token');

    this.campaign = navParams.get('campaign');
    console.log(this.campaign);
  }

  donate(){

    let details = {
      campaign_id : this.campaign.campaign_id,
      amount : this.value
    }

    if(this.auth.isLogged() === true){
      
      if(details.amount == 0){
        const toast = this.toast.create({
          message: 'Jumlah Harus Melebihi RM1',
          duration: 3000,
          position: 'middle'
        });      
        
        toast.present();
      }else{
        
        this.httpProvider.molpay(details).then((result) => {
        const browser = this.iab.create(result.toString());
        },
        (err)=>{
            console.log(err);
        });
      }  
        
    }else{
      let alert = this.alertCtrl.create({
        title : "Transaction Failed",
        subTitle : "You must login first",
        buttons : ['OK']
      })
      alert.present();
    }
  }

 login(){
   this.navCtrl.push(SignPage);
 }

}
