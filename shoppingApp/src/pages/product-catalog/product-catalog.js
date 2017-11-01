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
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {ProductDetailPage} from "../product-detail/product-detail";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";

/**
 * Generated class for the ProductCatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductCatalogPage = /** @class */ (function () {
    //private productList: any[] = [];
    // storage: Storage;
    function ProductCatalogPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.productsList = [];
        //checkForFilteredResults: any;
        this.tap = 0;
        this.filteredList = [];
        console.log(navParams.get('productLists'));
        if (navParams.get('productLists') != null) {
            this.filteredList = navParams.get('productLists');
        }
        if (navParams.get("shoppingCartProductList")) {
            this.productsList = navParams.get("shoppingCartProductList");
            console.log(this.productsList);
        }
        /*  if(storage.getItem("shoppingCartList") != null){
             storage.getItem("shoppingCartList").then(data => {
               this.productsList = data;
               console.log(this.productsList);
             }).catch(err => {
               console.log(err);
             })
          }*/
    }
    ProductCatalogPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductCatalogPage');
        // this.productsList=[];
        /*  this.navBar.backButtonClick = (e: UIEvent) => {
            // todo something
            this.productsList;
            console.log( "getting the information from product Details" );
            console.log( this.productsList );
            this.navCtrl.setRoot( HomePage, {"shoppingCartProductList": this.productsList} );
          }*/
    };
    ProductCatalogPage.prototype.onModelChange = function (evt) {
        console.log(evt);
    };
    ProductCatalogPage.prototype.tapEvent = function (evt) {
        console.log(evt);
        this.tap++;
    };
    ProductCatalogPage.prototype.getProductDetailView = function (product) {
        console.log(product);
        if (product) {
            console.log(product.productId);
            if (this.productsList.length > 0) {
                //this.storage.setItem("shoppingCartList", this.productsList);
                this.navCtrl.push(ProductDetailPage, {
                    'productInfo': product,
                    'shoppingCartList': this.productsList
                });
            }
            else {
                this.navCtrl.push(ProductDetailPage, { 'productInfo': product });
            }
        }
    };
    ProductCatalogPage.prototype.getProductItems = function (ev) {
        var _this = this;
        var searchVal = ev.target.value;
        console.log(searchVal);
        if (searchVal && searchVal.trim() != "") {
            this.db.list('productCatalog').subscribe(function (result) {
                _this.filteredList = result;
                _this.checkForFilteredResults(_this.filteredList, searchVal);
            });
        }
    };
    ProductCatalogPage.prototype.addProductToCart = function (product) {
        console.log(product);
        if (product) {
            this.productsList.push(product);
            //this.storage.setItem("shoppingCartList", this.productsList);
        }
    };
    ProductCatalogPage.prototype.showShoppingCart = function () {
        console.log(this.productsList.length);
        this.navCtrl.push(ShoppingCartPage, { shoppingLst: this.productsList });
    };
    ProductCatalogPage.prototype.checkForFilteredResults = function (filteredList, searchVal) {
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
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ProductCatalogPage.prototype, "navBar", void 0);
    ProductCatalogPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product-catalog',
            templateUrl: 'product-catalog.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AngularFireOfflineDatabase])
    ], ProductCatalogPage);
    return ProductCatalogPage;
}());
export { ProductCatalogPage };
//# sourceMappingURL=product-catalog.js.map
