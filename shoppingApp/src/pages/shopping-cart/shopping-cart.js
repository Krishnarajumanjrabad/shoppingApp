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
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {UtilityService} from "../../Utility/utilityService";
import {OrderDetailPage} from "../order-detail/order-detail";

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShoppingCartPage = /** @class */ (function () {
    //private storage: Storage;
    function ShoppingCartPage(navCtrl, navParams, storage, utilityService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.utilityService = utilityService;
        this.shippingPrice = 0;
        this.totalPrice = 0;
        this.qty = 0;
        this.price = 0;
        this.grandTotalPrice = 0;
        //  private productList: any[] = [];
        this.newqty = 0;
        //private productsList: any[] = [];
        //  private productInfos: ShoppingCart;
        this.shoppingList = [];
        // private productInfo: Product;
        this.newShoppingList = [];
        this.shoppingList = null;
        if (navParams.get("shoppingLst")) {
            this.shoppingList = navParams.get("shoppingLst");
            console.log("shopping cart const:" + this.shoppingList.length);
            this.newShoppingList = utilityService.buildProduct(this.shoppingList);
            this.shoppingList = [];
            this.shoppingList = this.newShoppingList;
        }
    }
    ShoppingCartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShoppingCartPage');
        /* this.navBar.backButtonClick = (e: UIEvent) => {
           // todo something
           this.shoppingList;
           console.log( this.shoppingList );
           this.navCtrl.push( ProductCatalogPage, {"shoppingCartProductList": this.shoppingList} );
         }*/
    };
    ShoppingCartPage.prototype.productRemove = function (product, i) {
        console.log(product + "index" + i);
        if (product != null) {
            console.log(i + product.productId);
            if (product.productSpecficationInfo.length > 0) {
                for (var _i = 0, _a = product.productSpecficationInfo; _i < _a.length; _i++) {
                    var specificationInfo = _a[_i];
                    product.totalPrice -= (product.qty * specificationInfo.price);
                    product.grandTotalPrice -= product.totalPrice;
                    //this.totalPrice = temptotalPrice;
                    console.log("productRemove" + product.totalPrice);
                    console.log("productRemove" + product.grandTotalPrice);
                }
            }
            this.shoppingList.splice(i, 1);
        }
        // this.storage.setItem( "shoppingCartList", this.shoppingList );
        console.log("prodct removal" + this.shoppingList.length);
        return this.shoppingList;
    };
    ShoppingCartPage.prototype.onModelQtyChange = function (evt) {
        this.newqty = 0;
        console.log(evt);
        this.newqty = parseInt(evt);
        console.log(this.newqty);
    };
    ShoppingCartPage.prototype.addProductToOrder = function () {
        console.log("Call the add ProductPage " + this.shoppingList.length);
        this.navCtrl.push(OrderDetailPage, { "orderplacementList": this.shoppingList });
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ShoppingCartPage.prototype, "navBar", void 0);
    ShoppingCartPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-shopping-cart',
            templateUrl: 'shopping-cart.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, NativeStorage, UtilityService])
    ], ShoppingCartPage);
    return ShoppingCartPage;
}());
export { ShoppingCartPage };
//# sourceMappingURL=shopping-cart.js.map
