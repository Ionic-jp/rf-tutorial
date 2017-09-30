import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ WordpressProvider ]
})
export class HomePage {

  posts:{
      ID      : number,
      title   : string,
      content : string,
      date    : string,
  }[] = [];
  
  constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public platform: Platform,
      public wp: WordpressProvider
  ) {}

    ionViewDidLoad(){
        if(!this.platform.is('android')){
            ga('send', 'pageview', '/signin');
        }
        let loading = this.loadingCtrl.create();
        loading.present();
        this.wp.get_posts()
            .subscribe(data => {
                this.posts = data['posts'];
                loading.dismiss();
            });
    }
}
