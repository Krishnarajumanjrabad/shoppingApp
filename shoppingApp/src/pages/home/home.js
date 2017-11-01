var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {NavController, NavParams, Platform} from 'ionic-angular';
import {UserInformation} from "../../model/userInformation";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";
//import { Gmailer } from 'gmail-sender';
//var Gmailer = require("gmail-sender");
var HomePage = /** @class */ (function () {
    function HomePage(http, navCtrl, navParams, db, auth, youtube, platform) {
        var _this = this;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.auth = auth;
        this.youtube = youtube;
        this.platform = platform;
        this.productsList = [];
        //checkForFilteredResults: any;
        this.tap = 0;
        this.filteredList = [];
        this.channelID = 'UCBmsZA5iO6ipCOHjZskOu2A';
        this.maxResults = '10';
        this.googleToken = 'AIzaSyAjsjKeHqXT7Kfk7tOs304pjqxbUykq8AE';
        this.searchQuery = 'Santosh Guruji';
        this.posts = [];
        this.onPlaying = false;
        if (navParams.get('productLists') != null) {
            this.filteredList = navParams.get('productLists');
        }
        if (navParams.get("shoppingCartProductList")) {
            this.productsList = navParams.get("shoppingCartProductList");
        }
        var url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId='
            + this.channelID + '&q='
            + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults
            + '&key=' + this.googleToken;
        if (this.pageToken) {
            url += '&pageToken=' + this.pageToken;
        }
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.posts = _this.posts.concat(data.items);
        });
        if (window.localStorage.getItem("user") != null) {
            var userInfos = JSON.parse(window.localStorage.getItem("user"));
            this.userInfo = new UserInformation(userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact, userInfos.email, userInfos.userType);
            console.log(this.userInfo);
            console.log("printing the user info:" + this.userInfo.userType);
        }
    }
    HomePage.prototype.onModelChange = function (evt) {
        console.log(evt);
    };
    HomePage.prototype.tapEvent = function (evt) {
        console.log(evt);
        this.tap++;
    };
    HomePage.prototype.getProductDetailView = function (product) {
        if (product) {
            this.navCtrl.push(ProductDetailPage, { 'productInfo': product });
        }
    };
    HomePage.prototype.getProductItems = function (ev) {
        var _this = this;
        var searchVal = ev.target.value;
        if (searchVal && searchVal.trim() != "") {
            this.db.list('/productCatalog').subscribe(function (result) {
                _this.filteredList = result;
                _this.checkForFilteredResults(_this.filteredList, searchVal);
            });
        }
    };
    HomePage.prototype.addProductToCart = function (product) {
        if (product) {
            this.productsList.push(product);
        }
    };
    HomePage.prototype.showShoppingCart = function () {
        if (this.productsList.length > 0) {
            this.navCtrl.push(ShoppingCartPage, { shoppingLst: this.productsList });
        }
    };
    HomePage.prototype.openVideo = function (video) {
        console.log("Inside the openVideo");
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.youtube.openVideo(video.id.videoId);
        }
        else {
            window.open();
        }
    };
    HomePage.prototype.checkForFilteredResults = function (filteredList, searchVal) {
        this.filteredList = this.filteredList.filter(function (results) {
            console.log(results + results.productDesc);
            console.log(results.productDesc.toLowerCase());
            if (results.productDesc.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
        return this.filteredList;
    };
    HomePage.prototype.logOff = function () {
        console.log('inside the log off functionality');
        this.auth.logOut();
        window.localStorage.removeItem("user");
        this.userInfo = null;
        this.userInfo = new UserInformation("", "", "", "", 0, "", "", 0, "", "");
        console.log(this.userInfo);
        this.navCtrl.popToRoot();
        // this.navCtrl.setRoot(HomePage, {"user": this.userInfo} );
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            NavParams,
            AngularFireOfflineDatabase,
            AuthenicateServiceProvider,
            YoutubeVideoPlayer,
            Platform])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
