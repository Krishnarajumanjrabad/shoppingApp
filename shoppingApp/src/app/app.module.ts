import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {HttpModule} from "@angular/http";
import {MenuServiceProvider} from '../providers/menu-service/menu-service';
import {AngularFireOfflineDatabase, AngularFireOfflineModule} from "angularfire2-offline";
import {
  AngularFireDatabaseModule,
  AngularFireDatabaseProvider
} from "angularfire2/database";
import {LoginPageModule} from "../pages/login/login.module";
import {CatalogPageModule} from "../pages/catalog/catalog.module";
import {CategoryPageModule} from "../pages/category/category.module";
import {SubcategoryPageModule} from "../pages/subcategory/subcategory.module";
import {CatalogServiceProvider} from '../providers/catalog-service/catalog-service';
import {CategoryServiceProvider} from '../providers/category-service/category-service';
import {SubCategoryServiceProvider} from '../providers/sub-category-service/sub-category-service';
import {ProductServiceProvider} from '../providers/product-service/product-service';
import {ProductPageModule} from "../pages/product/product.module";
import {CatagoryServiceProvider} from '../providers/catagory-service/catagory-service';
import {SubCatagoryServiceProvider} from '../providers/sub-catagory-service/sub-catagory-service';
import {ProductImageProcessingServiceProvider} from '../providers/product-image-processing-service/product-image-processing-service';
import {IonicImageViewerModule} from "ionic-img-viewer";
import {ProductDetailPageModule} from "../pages/product-detail/product-detail.module";
import {FormsModule} from "@angular/forms";
import {ShoppingCartPageModule} from "../pages/shopping-cart/shopping-cart.module";
import {ProductCatalogPageModule} from "../pages/product-catalog/product-catalog.module";
import {OrderDetailPageModule} from "../pages/order-detail/order-detail.module";
import {NativeStorage} from "@ionic-native/native-storage";
import {UtilityService} from "../Utility/utilityService";

export const firebaseConfig = {
  apiKey: "AIzaSyAMvympTBbGM8n7A_8rB0zJJvts08ZcdHk",
  authDomain: "ayushaurshopping.firebaseapp.com",
  databaseURL: "https://ayushaurshopping.firebaseio.com",
  projectId: "ayushaurshopping",
  storageBucket: "",
  messagingSenderId: "503001232323"
};

@NgModule( {
  declarations: [
    MyApp,
    HomePage,
    ListPage
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
    AngularFireModule.initializeApp( firebaseConfig ),
    IonicModule.forRoot( MyApp ),
    IonicImageViewerModule,
    ProductDetailPageModule,
    ShoppingCartPageModule,
    ProductCatalogPageModule,
    OrderDetailPageModule


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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuServiceProvider,
    AngularFireOfflineDatabase,
    AngularFireDatabaseProvider,
    CatalogServiceProvider,
    CategoryServiceProvider,
    SubCategoryServiceProvider,
    ProductServiceProvider,
    CatagoryServiceProvider,
    SubCatagoryServiceProvider,
    ProductImageProcessingServiceProvider,
    NativeStorage,
    UtilityService
  ]
} )
export class AppModule {
}
