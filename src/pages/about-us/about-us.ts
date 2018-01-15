import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  constructor(
    public iab:InAppBrowser, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController
    )
  {

  }

  web(){
    const browser = this.iab.create('http://www.myprihatin.org.my/');
  }

  fb(){
    const browser = this.iab.create('https://www.facebook.com/YayasanMyPrihatin/');
  }

}
