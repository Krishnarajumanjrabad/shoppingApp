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
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireAuth} from "angularfire2/auth";
import {Nav, Platform} from 'ionic-angular';
import {CatalogPage} from "../pages/catalog/catalog";
import {CategoryPage} from "../pages/category/category";
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {OrderHistoryPage} from "../pages/order-history/order-history";
import {ProductCatalogPage} from "../pages/product-catalog/product-catalog";
import {ProductPage} from "../pages/product/product";
import {SigninPage} from "../pages/signin/signin";
import {SubcategoryPage} from "../pages/subcategory/subcategory";
import {CatagoryServiceProvider} from "../providers/catagory-service/catagory-service";
import {CatalogServiceProvider} from "../providers/catalog-service/catalog-service";
import {MenuServiceProvider} from "../providers/menu-service/menu-service";
import {ProductServiceProvider} from "../providers/product-service/product-service";
import {SubCatagoryServiceProvider} from "../providers/sub-catagory-service/sub-catagory-service";

var MyApp = /** @class */ (function () {
    function MyApp(platform, subCatagoryService, catagoryService, catalogService, statusBar, splashScreen, menuService, productService, auth) {
        var _this = this;
        this.platform = platform;
        this.subCatagoryService = subCatagoryService;
        this.catagoryService = catagoryService;
        this.catalogService = catalogService;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuService = menuService;
        this.productService = productService;
        this.auth = auth;
        this.productLists = [];
        this.rootPage = HomePage;
        this.pages = [];
        this.showLevel1 = null;
        this.showLevel2 = null;
        this.adminPages = ['Create Catalog', 'Create Category', 'Create SubCategory', 'Create Product', 'Order History', 'Register'];
        this.regularPages = ['Order History'];
        this.nonRegisterPages = ["Register", "Login"];
        this.userInfo = null;
        this.initializeApp();
        var userInfos = null;
        // used for an example of ngFor and navigation
        this.menuList = menuService.getMenuInfo();
        this.catalogList = catalogService.getCatalogServiceList();
        this.catalogList.subscribe(function (items) {
            _this.catalogLists = items;
        });
        this.catagoryList = catagoryService.getCatagoryList();
        this.catagoryList.subscribe(function (results) {
            _this.categoryLists = results;
        });
        this.subCatagoryList = subCatagoryService.getSubCatagoryList();
        this.subCatagoryList.subscribe(function (datas) {
            _this.subCategoryLists = datas;
        });
        this.productList = productService.getProductCatalogList();
        userInfos = JSON.parse(window.localStorage.getItem("user"));
        console.log('Checking for the userInfos' + userInfos);
        if (userInfos != null) {
            this.auth.authState.subscribe(function (result) {
                console.log(result);
                if (result) {
                    if (userInfos.userType == "admin") {
                        console.log('inside the admin page');
                        _this.pages = _this.adminPages;
                        console.log(_this.pages);
                    }
                    if (userInfos.userType == "regular") {
                        console.log('inside the regular page');
                        _this.pages = _this.regularPages;
                        console.log(_this.pages);
                    }
                    _this.setRoot(HomePage);
                }
                else {
                    _this.pages = _this.nonRegisterPages;
                    console.log(_this.pages);
                    _this.setRoot(LoginPage);
                }
            });
            /* firebase.auth().i( (data) => {
               console.log( data );
               data.providerData.forEach( item => {
                 console.log( item );
               } ).promise().then( result =>{
                 console.log(result);
               });
       
       
               if (data) {
                 //this.navCtrl.popToRoot();
       
                 this.pages = [];
       
                 if (userInfos.userType == "admin") {
                   console.log( 'inside the admin page' );
                   this.pages = this.adminPages;
                   console.log( this.pages );
                 }
       
                 if (userInfos.userType == "regular") {
                   console.log( 'inside the regular page' );
                   this.pages = this.regularPages;
                   console.log( this.pages );
                 }
       
       
                 this.setRoot( HomePage );
               } else {
                 this.setRoot( LoginPage );
               }
       
       
             } );*/
            //  console.log( userInfos );
        }
        else {
            console.log("On load of the shopping app");
            this.pages = this.nonRegisterPages;
            console.log(this.pages);
        }
    }
    MyApp.prototype.toggleLevel1 = function (idx) {
        if (this.isLevel1Shown(idx)) {
            this.showLevel1 = null;
        }
        else {
            this.showLevel1 = idx;
        }
    };
    MyApp.prototype.toggleLevel2 = function (idx) {
        if (this.isLevel2Shown(idx)) {
            this.showLevel1 = null;
            this.showLevel2 = null;
        }
        else {
            this.showLevel1 = idx;
            this.showLevel2 = idx;
        }
    };
    MyApp.prototype.isLevel1Shown = function (idx) {
        return this.showLevel1 === idx;
    };
    ;
    MyApp.prototype.isLevel2Shown = function (idx) {
        return this.showLevel2 === idx;
    };
    ;
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    };
    MyApp.prototype.openPage = function (page) {
        console.log(page);
        if (page == 'Create Catalog') {
            this.nav.push(CatalogPage);
        }
        else if (page == "Create Category") {
            this.nav.push(CategoryPage);
        }
        else if (page == "Create SubCategory") {
            this.nav.push(SubcategoryPage);
        }
        else if (page == "Create Product") {
            this.nav.push(ProductPage);
        }
        else if (page === "Order History") {
            console.log('inside the order page');
            this.nav.push(OrderHistoryPage);
        }
        else if (page == "Register") {
            this.nav.push(SigninPage);
        }
        else if (page == 'Login') {
            this.nav.push(LoginPage);
        }
    };
    MyApp.prototype.showProductWithCatalogId = function (catalogId) {
        var _this = this;
        console.log("Displaying the product by catalog ID:" + catalogId);
        this.productList.subscribe(function (items) {
            _this.productLists = _this.getFilteredList(items, catalogId);
        });
        this.pushToPage(this.productLists);
    };
    MyApp.prototype.showProductWithCatagoryId = function (catagoryId) {
        var _this = this;
        this.productList.subscribe(function (items) {
            _this.productLists = _this.getFilteredList(items, catagoryId);
        });
        this.pushToPage(this.productLists);
    };
    MyApp.prototype.showProductWithSubCatagoryId = function (subCatagoryId) {
        var _this = this;
        this.productList.subscribe(function (results) {
            _this.productLists = _this.getFilteredList(results, subCatagoryId);
        });
        this.pushToPage(this.productLists);
    };
    MyApp.prototype.pushToPage = function (productLists) {
        if (productLists) {
            this.nav.push(ProductCatalogPage, { productLists: this.productLists });
        }
    };
    MyApp.prototype.getFilteredList = function (results, Id) {
        this.productLists = results.filter(function (item) {
            //    console.log(item);
            if (item.subCatagoryId.indexOf(Id) > -1) {
                return true;
            }
            else if (item.catagoryId.indexOf(Id) > -1) {
                return true;
            }
            else if (item.catalogId.indexOf(Id) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
        return this.productLists;
    };
    MyApp.prototype.setRoot = function (newRootPage) {
        this.rootPage = newRootPage;
        // this.navCrt.setRoot(this.rootPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SubCatagoryServiceProvider,
            CatagoryServiceProvider,
            CatalogServiceProvider,
            StatusBar,
            SplashScreen,
            MenuServiceProvider,
            ProductServiceProvider,
            AngularFireAuth])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map
