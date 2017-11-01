var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from '@angular/platform-browser';
import {NativeStorage} from "@ionic-native/native-storage";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {AngularFireModule} from "angularfire2";
import {AngularFireOfflineDatabase, AngularFireOfflineModule} from "angularfire2-offline";
import {AngularFireAuth} from "angularfire2/auth";
import {
  AngularFireDatabaseModule,
  AngularFireDatabaseProvider
} from "angularfire2/database";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicImageViewerModule} from "ionic-img-viewer";
import {CatalogPageModule} from "../pages/catalog/catalog.module";
import {CategoryPageModule} from "../pages/category/category.module";
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPageModule} from "../pages/login/login.module";
import {OrderConfirmationPageModule} from "../pages/order-confirmation/order-confirmation.module";
import {OrderDetailPageModule} from "../pages/order-detail/order-detail.module";
import {OrderHistoryPageModule} from "../pages/order-history/order-history.module";
import {ProductCatalogPageModule} from "../pages/product-catalog/product-catalog.module";
import {ProductDetailPageModule} from "../pages/product-detail/product-detail.module";
import {ProductPageModule} from "../pages/product/product.module";
import {ShoppingCartPageModule} from "../pages/shopping-cart/shopping-cart.module";
import {SigninPageModule} from "../pages/signin/signin.module";
import {SubcategoryPageModule} from "../pages/subcategory/subcategory.module";
import {YoutubePipe} from "../pipes/youtube/youtube";
import {AuthenicateServiceProvider} from '../providers/authenicate-service/authenicate-service';
import {CatagoryServiceProvider} from '../providers/catagory-service/catagory-service';
import {CatalogServiceProvider} from '../providers/catalog-service/catalog-service';
import {CategoryServiceProvider} from '../providers/category-service/category-service';
import {EmailServiceProvider} from '../providers/email-service/email-service';
import {MenuServiceProvider} from '../providers/menu-service/menu-service';
import {OrderconfirmationserviceProvider} from '../providers/orderconfirmationservice/orderconfirmationservice';
import {ProductImageProcessingServiceProvider} from '../providers/product-image-processing-service/product-image-processing-service';
import {ProductServiceProvider} from '../providers/product-service/product-service';
import {SubCatagoryServiceProvider} from '../providers/sub-catagory-service/sub-catagory-service';
import {UtilityService} from "../Utility/utilityService";
import {MyApp} from './app.component';

export var firebaseConfig = {
    /*apiKey: "AIzaSyAMvympTBbGM8n7A_8rB0zJJvts08ZcdHk",
    authDomain: "ayushaurshopping.firebaseapp.com",
    databaseURL: "https://ayushaurshopping.firebaseio.com",
    projectId: "ayushaurshopping",
    storageBucket: "",
    messagingSenderId: "503001232323"*/
    apiKey: "AIzaSyB3bcy2rGya6VCzWooI21tsSA6_FsTtOHU",
    authDomain: "ayushaurshopping-17a68.firebaseapp.com",
    databaseURL: "https://ayushaurshopping-17a68.firebaseio.com",
    projectId: "ayushaurshopping-17a68",
    storageBucket: "ayushaurshopping-17a68.appspot.com",
    messagingSenderId: "531983213845"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                YoutubePipe
            ],
            imports: [
                BrowserModule,
                AngularFireDatabaseModule,
                AngularFireOfflineModule,
                FormsModule,
                LoginPageModule,
                CatalogPageModule,
                CategoryPageModule,
                SubcategoryPageModule,
                ProductPageModule,
                HttpModule,
                AngularFireModule.initializeApp(firebaseConfig),
                IonicModule.forRoot(MyApp),
                IonicImageViewerModule,
                ProductDetailPageModule,
                ShoppingCartPageModule,
                ProductCatalogPageModule,
                OrderDetailPageModule,
                SigninPageModule,
                OrderConfirmationPageModule,
                OrderHistoryPageModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                MenuServiceProvider,
                AngularFireOfflineDatabase,
                AngularFireDatabaseProvider,
                AngularFireAuth,
                CatalogServiceProvider,
                CategoryServiceProvider,
                SubCatagoryServiceProvider,
                ProductServiceProvider,
                CatagoryServiceProvider,
                SubCatagoryServiceProvider,
                ProductImageProcessingServiceProvider,
                NativeStorage,
                UtilityService,
                { provide: Window, useValue: window, useClass: Window },
                YoutubeVideoPlayer,
                AuthenicateServiceProvider,
                OrderconfirmationserviceProvider,
                EmailServiceProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
