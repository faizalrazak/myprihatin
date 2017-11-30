import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { SignPage } from '../pages/sign/sign';
import { AboutUsPage } from '../pages/about-us/about-us';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon:any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl:MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Laman Utama', component: HomePage, icon: 'ios-home-outline' },
      { title: 'Senarai Kempen', component: HomePage, icon: 'ios-list-box-outline' },
      { title: 'Aktiviti Terkini', component: ContactPage, icon: 'ios-calendar-outline' },
      { title: 'Profil & Transaksi', component: ProfilePage, icon: 'md-finger-print' },
      { title: 'Bantuan', component: SignPage, icon: 'ios-help-circle-outline' },
      { title: 'Tentang Yayasan', component: AboutUsPage, icon: 'ios-briefcase-outline' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
