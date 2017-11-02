import {Events, NavController, NavParams, Platform} from 'ionic-angular';

import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";
import {UserInformation} from "../../model/userInformation";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {LoginPage} from "../login/login";


//import { Gmailer } from 'gmail-sender';
//var Gmailer = require("gmail-sender");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  productsList: any[] = [];
  //checkForFilteredResults: any;
  tap: number = 0;
  filteredList: any[] = [];

  channelID: string = 'UCBmsZA5iO6ipCOHjZskOu2A';
  maxResults: string = '10';
  pageToken: string;
  googleToken: string = 'AIzaSyAjsjKeHqXT7Kfk7tOs304pjqxbUykq8AE';
  searchQuery: string = 'Santosh Guruji';
  posts: any[] = [];
  onPlaying: boolean = false;
  userInfo: UserInformation;


  public constructor(
    public evt: Events,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireOfflineDatabase,
    public auth: AuthenicateServiceProvider,
    public youtube: YoutubeVideoPlayer,
    public platform: Platform) {

    if (navParams.get('productLists') != null) {
      this.filteredList = navParams.get('productLists');

    }
    if (navParams.get("shoppingCartProductList")) {
      this.productsList = navParams.get("shoppingCartProductList");

    }

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId='
      + this.channelID + '&q='
      + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults
      + '&key=' + this.googleToken;

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.posts = this.posts.concat(data.items);

    });

    if (window.localStorage.getItem("user") != null) {
      let userInfos = JSON.parse(window.localStorage.getItem("user"));
      this.userInfo = new UserInformation(userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact, userInfos.email, userInfos.userType);


      console.log(this.userInfo);
      console.log("printing the user info:" + this.userInfo.userType);

    }


  }

  onModelChange(evt) {
    console.log(evt);
  }

  tapEvent(evt) {
    console.log(evt);
    this.tap++;
  }

  getProductDetailView(product) {
    if (product) {
      this.navCtrl.push(ProductDetailPage, { 'productInfo': product });
    }
  }

  getProductItems(ev) {
    let searchVal = ev.target.value;
    if (searchVal && searchVal.trim() != "") {

   /*   this.db.listCache('/productCatalog').subscribe(result => {
        this.filteredList = result;
        this.checkForFilteredResults(this.filteredList, searchVal);
      });*/
      this.db.list('/productCatalog').subscribe(result => {
        this.filteredList = result;
        this.checkForFilteredResults(this.filteredList, searchVal);
      });
    }
  }

  addProductToCart(product) {
    if (product) {
      this.productsList.push(product);

    }

  }

  showShoppingCart() {
    if (this.productsList.length > 0) {
      this.navCtrl.push(ShoppingCartPage, { shoppingLst: this.productsList });
    }
  }

  openVideo(video) {
    console.log("Inside the openVideo");
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.youtube.openVideo(video.id.videoId);
    } else {
      window.open()
    }

  }

  checkForFilteredResults(filteredList: any[], searchVal: any) {
    this.filteredList = this.filteredList.filter(results => {
      console.log(results + results.productDesc);
      console.log(results.productDesc.toLowerCase());

      if (results.productDesc.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }


    });
    return this.filteredList;
  }


  logOff(event) {

    console.log('inside the log off functionality');

    this.auth.logOut();
    window.localStorage.removeItem("user");
    window.localStorage.clearHistory;
    this.userInfo = null;
    this.userInfo = new UserInformation("", "", "", "", 0, "", "", 0, "", "");
    console.log(this.userInfo);
    this.evt.publish('userInfo', this.userInfo);
  //  clearHistory = true;
    this.navCtrl.setRoot(LoginPage).then(() =>{
      this.navCtrl.popToRoot();
    });
    // this.navCtrl.setRoot(HomePage, {"user": this.userInfo} );
  }
}
