var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Component, ViewChild} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {OrderDetailPage} from "../order-detail/order-detail";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, navParams, storage, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.db = db;
        this.qty = 1;
        this.totalPrice = 0;
        this.shippingPrice = 0;
        this.tap = 0;
        this.rate = 0;
        this.user = "";
        this.email = "";
        this.comments = "";
        this.starsCounts = [];
        this.reviewUserMatchFound = false;
        this.productsList = [];
        this.productInfo = navParams.get("productInfo");
        if (this.navParams.get("shoppingCartList") != null) {
            this.productsList = [];
            this.productsList = this.navParams.get("shoppingCartList");
            console.log(this.productsList);
            console.log(this.productsList.length);
        }
        /*    if(storage.getItem("shoppingCartList") != null){
              this.storage.getItem("shoppingCartList").then( data => {
                this.productsList = data;
                console.log(this.productsList);
              }).catch(err => {
                console.log(err);
              });
            }*/
        this.reviewCommentsList = this.db.list('/reviewComments', {
            query: {
                orderByChild: 'rating'
            }
        });
    }
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ProductDetailPage');
        // this.productsList=[];
        this.navBar.backButtonClick = function (e) {
            // todo something
            _this.productsList;
            console.log("getting the information from product Details");
            console.log(_this.productsList);
            _this.navCtrl.pop();
        };
    };
    ProductDetailPage.prototype.tapEvent = function (evt) {
        this.tap++;
        console.log(this.tap);
    };
    ProductDetailPage.prototype.addProductToCart = function (product) {
        this.productsList = [];
        console.log(product);
        if (product) {
            this.productsList.push(product);
        }
    };
    ProductDetailPage.prototype.showShoppingCart = function (productList) {
        // this.productsList=null;
        console.log(productList.length);
        this.navCtrl.push(ShoppingCartPage, { "shoppingLst": this.productsList });
    };
    ProductDetailPage.prototype.buyProducts = function (productInfo) {
        if (productInfo) {
            this.productsList.push(productInfo);
            //   this.storage.setItem("shoppingCartList", this.productsList);
            this.navCtrl.push(OrderDetailPage, { "orderplacementList": this.productsList });
        }
    };
    ProductDetailPage.prototype.onModelChange = function (event) {
        this.rate = event;
        console.log(event);
        console.log(this.rate);
    };
    ProductDetailPage.prototype.reviewSubit = function (reviewForm, productId) {
        var _this = this;
        console.log(reviewForm.value + reviewForm.valid);
        if (reviewForm.valid && productId != null) {
            console.log('ínside the valid form' + reviewForm.value.user);
            var reviewComments_1 = {
                productId: productId,
                name: reviewForm.value.user,
                email: reviewForm.value.email,
                comments: reviewForm.value.comments,
                rating: this.rate,
                createdDate: new Date().toUTCString()
            };
            this.reviewCommentsList = this.db.list('/reviewComments', {
                query: {
                    orderByChild: 'rating'
                }
            });
            if (this.reviewCommentsList != null) {
                this.reviewCommentsList.subscribe(function (results) {
                    console.log(results);
                    // this.reviewUserMatchFound = false;
                    if (results.length > 0) {
                        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                            var item = results_1[_i];
                            console.log(item.user);
                            if (item.email.toLowerCase() === reviewForm.value.email.toLowerCase()) {
                                _this.reviewUserMatchFound = true;
                                break;
                            }
                        }
                        if (!_this.reviewUserMatchFound) {
                            _this.reviewCommentsList.push(reviewComments_1);
                        }
                    }
                    else {
                        console.log('this is first time inserting the review comments');
                        _this.reviewCommentsList.push(reviewComments_1);
                    }
                });
            }
        }
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ProductDetailPage.prototype, "navBar", void 0);
    ProductDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'product-detail',
            templateUrl: 'product-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            NativeStorage, AngularFireOfflineDatabase])
    ], ProductDetailPage);
    return ProductDetailPage;
}());
export { ProductDetailPage };
//# sourceMappingURL=product-detail.js.map
