import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignPage } from '../pages/sign/sign';
import { ProfilePage } from '../pages/profile/profile';
import { PaymentPage } from '../pages/payment/payment';
import { CommentPage } from '../pages/comment/comment';
import { UpdatePage } from '../pages/update/update';
import { DetailsPage } from '../pages/details/details';
import { RegisterPage } from '../pages/register/register';
import { EditProfilePage} from '../pages/edit-profile/edit-profile';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ArticleDetailsPage } from '../pages/article-details/article-details';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { MyDonationPage } from '../pages/my-donation/my-donation';
import { ArticleCommentPage }  from '../pages/article-comment/article-comment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { HttpProvider } from '../providers/http/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    AboutPage,
    ContactPage,
    HomePage,
    SignPage,
    ProfilePage,
    PaymentPage,
    CommentPage,
    UpdatePage,
    DetailsPage,
    RegisterPage,
    EditProfilePage,
    AboutUsPage,
    ForgetPasswordPage,
    ArticleDetailsPage,
    NewsDetailsPage,
    UserDetailsPage,
    MyDonationPage,
    ArticleCommentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    ContactPage,
    SignPage,
    ProfilePage,
    PaymentPage,
    CommentPage,
    UpdatePage,
    DetailsPage,
    RegisterPage,
    EditProfilePage,
    AboutUsPage,
    ForgetPasswordPage,
    ArticleDetailsPage,
    NewsDetailsPage,
    UserDetailsPage,
    MyDonationPage,
    ArticleCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    HttpProvider,
    SocialSharing,
    AuthProvider,
    InAppBrowser,
  ]
})
export class AppModule {}
