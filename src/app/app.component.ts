import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { ListPage } from '../pages/list/list';
import { SignPage } from '../pages/sign/sign';
import { AboutUsPage } from '../pages/about-us/about-us';
import { FCM } from '@ionic-native/fcm';
// import { AuthProvider } from '../providers/auth/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon:any }>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public menuCtrl:MenuController,
    public fcm:FCM
    // public auth:AuthProvider
    )
  {
    this.initializeApp();

    this.pages = [
        { title: 'Laman Utama', component: HomePage, icon: 'ios-home-outline' },
        { title: 'Senarai Kempen', component: HomePage, icon: 'ios-list-box-outline' },
        { title: 'Aktiviti Terkini', component: ContactPage, icon: 'ios-calendar-outline' },
        { title: 'Profil & Transaksi', component: ProfilePage, icon: 'md-finger-print' },
        { title: 'Bantuan', component: ListPage, icon: 'ios-help-circle-outline' },
        { title: 'Tentang Yayasan', component: AboutUsPage, icon: 'ios-briefcase-outline' }
      ];   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.fcm.getToken().then(token => {
      //   // Your best bet is to here store the token on the user's profile on the
      //   // Firebase database, so that when you want to send notifications to this 
      //   // specific user you can do it from Cloud Functions.
      // });

      // this.fcm.onNotification().subscribe(data => {
      //   if (data.wasTapped) {
      //     //Notification was received on device tray and tapped by the user.
      //     console.log(JSON.stringify(data));
      //   } else {
      //     //Notification was received in foreground. Maybe the user needs to be notified.
      //     console.log(JSON.stringify(data));
      //     // this.navCtrl.push(, { profileId: data.profileId });
      //   }
      // });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  dissmiss(){
    this.menuCtrl.close();
  }
}
