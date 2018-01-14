import { Injectable } from '@angular/core';
import { Http , Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/Storage';

/*
  Generated class for the AuthProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

	public token : any;
  baseUrl:string = "https://mydana.herokuapp.com/api/";


  constructor(public http: Http, private storage:Storage) {
    console.log('Hello AuthProvider Provider');
  }

  forgetPassword(email){

    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.baseUrl + "login", JSON.stringify(email), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            console.log(this.token)
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });

  }


  isLogged(){
    if(window.localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    window.localStorage.removeItem('token');
    return true;
  }

  login(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.baseUrl + "login", JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            console.log(this.token)
            window.localStorage.setItem('token', this.token);
            console.log(window.localStorage);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }

  loginFacebook(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.baseUrl + "fb", JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            console.log(this.token)
            window.localStorage.setItem('token', this.token);
            console.log(window.localStorage);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }

}