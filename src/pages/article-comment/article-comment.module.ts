import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleCommentPage } from './article-comment';

@NgModule({
  declarations: [
    ArticleCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleCommentPage),
  ],
})
export class ArticleCommentPageModule {}
