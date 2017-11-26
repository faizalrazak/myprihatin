import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

   getLatest(){
    return this.http.get("https://mydana.herokuapp.com/api/latest")
    .map(res => res.json())  
  }

   getCampaign(campaign_id){
    return this.http.get("https://mydana.herokuapp.com/api/campaign/"+campaign_id)
    .map(res => res.json())  
  }

  getSliderImage(){
    return this.http.get("https://mydana.herokuapp.com/api/banners")
    .map(res => res.json())  
  }

  getArticle(){
    return this.http.get("https://mydana.herokuapp.com/api/articles")
    .map(res => res.json())
  }

  getUserProfile(){
    return this.http.get("https://mydana.herokuapp.com/api/user/1")
    .map(res => res.json())

    // let headers = new Headers();
    // headers.append('Authorization','Bearer ' + token);

    // var options = new RequestOptions({headers:headers})
    // return this.http.get("https://mydana.herokuapp.com/api/user/", options)
    // .map(res => res.json())
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
       console.log(details);
      this.http.post('https://mydana.herokuapp.com/api/user/1', JSON.stringify(details), {headers:headers})
      .subscribe(res => {
       
        let data = res.json();
        console.log(data);
        resolve(data);
      
      }, (err) => {
        reject(err);
      });
    });

  }

// login(credentials){
 
//     return new Promise((resolve, reject) => {
 
//         let headers = new Headers();
//         headers.append('Content-Type', 'application/json');
 
//         this.http.post('https://mysterious-beach-83937.herokuapp.com/login', JSON.stringify(credentials), {headers: headers})
//           .subscribe(res => {
 
//             let data = res.json();
//             this.token = data.token;
//             this.storage.set('token', data.token);
//             resolve(data);
 
//             resolve(res.json());
//           }, (err) => {
//             reject(err);
//           });
 
//     });
 
//   }

}
