import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpProvider {
user_id = "?user_id="+window.localStorage.getItem('user_id');
  constructor(public http: Http, public auth:AuthProvider) {
    console.log(this.user_id)
    if(this.user_id == ""){
      this.user_id = "";
    }
  }

   getLatest(page){
    return this.http.get("https://mydana.herokuapp.com/api/latest"+this.user_id+"?page="+page)
    .map(res => res.json())  
  }

   getCampaign(campaign_id){
    return this.http.get("https://mydana.herokuapp.com/api/campaign/"+campaign_id+this.user_id)
    .map(res => res.json())  
  }

  getSliderImage(){
    return this.http.get("https://mydana.herokuapp.com/api/banners")
    .map(res => res.json())  
  }

  getAllArticle(){
    return this.http.get("https://mydana.herokuapp.com/api/articles" + this.user_id)
    .map(res => res.json())
  }

  getArticle(id){
    return this.http.get("https://mydana.herokuapp.com/api/article/"+ id+this.user_id)
    .map(res => res.json())
  }

  getCampaignComment(id){
    return this.http.get("https://mydana.herokuapp.com/api/campaign/"+ id + "/campaigncomment")
    .map(res => res.json())
  }

   getArticleComment(id){
    return this.http.get("https://mydana.herokuapp.com/api/article/"+ id + "/comment")
    .map(res => res.json())
  }

  getCampaignNews(id){
    return this.http.get("https://mydana.herokuapp.com/api/campaign/" + id +"/campaignnew")
    .map(res => res.json())
  }

  getLatestCampaign(page){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('user_id', window.localStorage.getItem('user_id'));
 
      this.http.get("https://mydana.herokuapp.com/api/latest?page="+page)
        .map(
          res => res.json())
        .subscribe(
          data => {
            resolve(data.data);
            console.log('data')
        }, (err) => {
          reject(err);
        });
    });
  }

  getUser(){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
      
 
      this.http.get('https://mydana.herokuapp.com/api/users', {headers: headers})
        .map(
          res => res.json())
        .subscribe(
          data => {
            resolve(data.data);
            console.log('data')
        }, (err) => {
          reject(err);
        });
    });
  }

  postLike(details){
   
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/campaign/like', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteLike(campaign_id){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.post('https://mydana.herokuapp.com/api/campaign/'+ campaign_id + '/like/delete/' + window.localStorage.getItem('user_id'), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  postArticleLike(details){
   console.log('sini ' + details)
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/article/like', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteArticleLike(article_id){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.post('http://mydana.herokuapp.com/api/article/'+ article_id + '/like/delete/' + window.localStorage.getItem('user_id'), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }



  postComment(details){
   
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/campaign/'+ details.campaign_id +'/campaigncomment', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  articleComment(details){
   
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/articlecomment', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  molpay(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/payment', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        
        resolve(data.data);
        console.log(data);

      
      }, (err) => {
        reject(err);
      });
    });
  }

  postFund(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/fund', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  register(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/register', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });
  }

  updateUser(details){

     return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post('https://mydana.herokuapp.com/api/user/' + details.user_id, JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });

  }
}
