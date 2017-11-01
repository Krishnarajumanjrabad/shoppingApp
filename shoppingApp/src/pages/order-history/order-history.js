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
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserInformation} from "../../model/userInformation";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderHistoryPage = /** @class */ (function () {
    function OrderHistoryPage(navCtrl, navParams, db, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.auth = auth;
        this.filteredList = [];
        if (window.localStorage.getItem("user") != null) {
            var userInfos = JSON.parse(window.localStorage.getItem("user"));
            //console.log(userInfos);
            this.userInfo = new UserInformation(userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact, userInfos.email, userInfos.userType);
            console.log(this.userInfo);
        }
        this.orderInfoList = this.db.list("/order", { query: {
                orderByChild: "orderid",
                limitToLast: 5
            } });
        this.orderInfoList.subscribe(function (results) {
            results.forEach(function (items) {
                console.log(items);
                if (items.user.email == _this.userInfo.email) {
                    _this.filteredList.push(items);
                    console.log(_this.filteredList);
                }
                /*items.forEach(item =>{
                  if(item.userInfo.email == this.userInfo.email){
                    this.filteredList.push(item);
                  }
                });*/
            });
        });
    }
    OrderHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderHistoryPage');
    };
    OrderHistoryPage.prototype.getOrderedItems = function (event) {
        var _this = this;
        var searchVal = event.target.value;
        if (searchVal && searchVal.trim() != "") {
            this.db.list('/order', { query: {
                    orderByChild: "orderid",
                    limitToLast: 5
                } }).subscribe(function (result) {
                _this.filteredList = result;
                _this.checkForFilteredResults(_this.filteredList, searchVal);
            });
        }
    };
    OrderHistoryPage.prototype.checkForFilteredResults = function (filteredList, searchVal) {
        this.filteredList = this.filteredList.filter(function (results) {
            if (results.orderid == searchVal) {
                return true;
            }
            else {
                return false;
            }
        });
        return this.filteredList;
    };
    OrderHistoryPage.prototype.logOff = function () {
        console.log('inside the log off functionality');
        this.auth.logOut();
        window.localStorage.removeItem("user");
        this.userInfo = new UserInformation("", "", "", "", 0, "", "", 0, "", "");
        this.navCtrl.popToRoot();
        this.navCtrl.setRoot("HomePage");
    };
    OrderHistoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-order-history',
            templateUrl: 'order-history.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireOfflineDatabase,
            AuthenicateServiceProvider])
    ], OrderHistoryPage);
    return OrderHistoryPage;
}());
export { OrderHistoryPage };
//# sourceMappingURL=order-history.js.map
