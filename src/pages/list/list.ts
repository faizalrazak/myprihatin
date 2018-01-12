import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  shownGroup = null;

  soalan = [
	  {
	  	title : "Soalan 1",
	  	description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	  },
	  {
	  	title : "Soalan 2",
	  	description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	  },
	  {
	  	title : "Soalan 3",
	  	description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	  }
  ];

  deviceObj = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  	
  	storage.get('token').then((val) => {
    console.log('my token : ', val);
  });
  }

  // getData(){
  // 	let that = this;
	 //  this.storage.get('token').then((resp) => {
	 //      if(resp !== null){
	 //        console.log(resp);
	 //        that.deviceObj.push(resp);
	 //      }
	 //  });
  // }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    }else {
        this.shownGroup = group;
	  }
	};

	isGroupShown(group) {
	    return this.shownGroup === group;
	};

}
