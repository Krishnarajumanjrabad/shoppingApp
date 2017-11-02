import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';

import {AfoListObservable} from "angularfire2-offline";
import {AngularFireAuth} from "angularfire2/auth";
import {CatagoryServiceProvider} from "../providers/catagory-service/catagory-service";
import {CatalogPage} from "../pages/catalog/catalog";
import {CatalogServiceProvider} from "../providers/catalog-service/catalog-service";
import {CategoryPage} from "../pages/category/category";
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MenuServiceProvider} from "../providers/menu-service/menu-service";
import {OrderHistoryPage} from "../pages/order-history/order-history";
import {ProductCatalogPage} from "../pages/product-catalog/product-catalog";
import {ProductPage} from "../pages/product/product";
import {ProductServiceProvider} from "../providers/product-service/product-service";
import {SigninPage} from "../pages/signin/signin";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {SubCatagoryServiceProvider} from "../providers/sub-catagory-service/sub-catagory-service";
import {SubcategoryPage} from "../pages/subcategory/subcategory";
import {UserInformation} from "../model/userInformation";
import {Network} from "@ionic-native/network";

@Component( {
  templateUrl: 'app.html'
} )
export class MyApp {
  productLists: any[] = [];
  @ViewChild( Nav ) nav: Nav;
  rootPage: any = HomePage;
  pages: any[] = [];
  filteredList: any[];
  productList: AfoListObservable<any[]>;
  productsList: any[];
  showLevel1 = null;
  showLevel2 = null;
  adminPages: any[] = ['Create Catalog', 'Create Category', 'Create SubCategory', 'Create Product', 'Order History', 'Register'];
  regularPages: any[] = ['Order History'];
  nonRegisterPages: any[] = ["Register", "Login"];

  catagoryList: AfoListObservable<any[]>;
  menuList: AfoListObservable<any[]>;
  catalogList: AfoListObservable<any[]>;
  subCatagoryList: AfoListObservable<any[]>;

  //initialising of catalogLists, categoryLists and subCategoryLists
  catalogLists: any[];
  categoryLists: any[];
  subCategoryLists: any[];
  userInfo: UserInformation = null;
  menuLoadNotification: boolean = false;


  constructor(public evt: Events,
              public platform: Platform,
              public subCatagoryService: SubCatagoryServiceProvider,
              public catagoryService: CatagoryServiceProvider,
              public catalogService: CatalogServiceProvider,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menuService: MenuServiceProvider,
              public productService: ProductServiceProvider,
              public auth: AngularFireAuth,
              public network: Network) {
    this.initializeApp();
   // let userInfos = null;

    // used for an example of ngFor and navigation
    this.menuList = menuService.getMenuInfo();

    this.catalogList = catalogService.getCatalogServiceList();
    this.catalogList.subscribe( items => {
      this.catalogLists = items;
    } );

    this.catagoryList = catagoryService.getCatagoryList();
    this.catagoryList.subscribe( results => {
      this.categoryLists = results;
    } );

    this.subCatagoryList = subCatagoryService.getSubCatagoryList();
    this.subCatagoryList.subscribe( datas => {
      this.subCategoryLists = datas;
    } );

    this.productList = productService.getProductCatalogList();
    //check for the network is available and connection type
    this.network.onConnect().subscribe( (data) => {
      console.log("inside the connected to the network"+ data);
      data.forEach((item) =>{
        console.log("printing the items from network"+item);
      });
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    }).unsubscribe();


    this.network.onDisconnect().subscribe( (data) => {
      console.log("in the disconnection stage" + data);
    }).unsubscribe();

    this.evt.subscribe( 'userInfo', (userData) => {
      console.log( userData );
      if (userData) {
        this.menuLoadNotification = true;
        if (userData.userType == "admin") {
          console.log( 'inside the admin page' );
          this.pages = this.adminPages;
          console.log( this.pages );
        }

        if (userData.userType == "regular") {
          console.log( 'inside the regular page' );
          this.pages = this.regularPages;
          console.log( this.pages );
        }

        this.setRoot( HomePage );
      } else {
        console.log( 'inside the else loop' );
        this.pages = this.nonRegisterPages;
        console.log( this.pages );
        this.setRoot( HomePage );
      }

    } );

    if (this.menuLoadNotification == false) {
      this.pages = this.nonRegisterPages;
      console.log( this.pages );
      this.setRoot( HomePage );
    }


  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown( idx )) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }


  toggleLevel2(idx) {
    if (this.isLevel2Shown( idx )) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  }


  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  }


  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  }


  initializeApp() {
    this.platform.ready().then( () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var tag = document.createElement( 'script' );
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName( 'script' )[0];
      firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );


    } );
  }

  openPage(page) {
    console.log( page );
    if (page == 'Create Catalog') {
      this.nav.push( CatalogPage );
    } else if (page == "Create Category") {
      this.nav.push( CategoryPage );
    } else if (page == "Create SubCategory") {
      this.nav.push( SubcategoryPage );
    } else if (page == "Create Product") {
      this.nav.push( ProductPage );
    } else if (page === "Order History") {
      console.log( 'inside the order page' );
      this.nav.push( OrderHistoryPage );
    } else if (page == "Register") {
      this.nav.push( SigninPage );
    } else if (page == 'Login') {
      this.nav.push( LoginPage );
    }


  }

  showProductWithCatalogId(catalogId) {
    console.log( "Displaying the product by catalog ID:" + catalogId );

    this.productList.subscribe( items => {
      this.productLists = this.getFilteredList( items, catalogId );

    } );
    this.pushToPage( this.productLists );
  }

  showProductWithCatagoryId(catagoryId) {
    this.productList.subscribe( items => {
      this.productLists = this.getFilteredList( items, catagoryId );
    } );
    this.pushToPage( this.productLists );

  }

  showProductWithSubCatagoryId(subCatagoryId) {
    this.productList.subscribe( results => {

      this.productLists = this.getFilteredList( results, subCatagoryId );

    } );
    this.pushToPage( this.productLists );
  }

  pushToPage(productLists) {
    if (productLists) {
      this.nav.push( ProductCatalogPage, {productLists: this.productLists} );
    }
  }

  getFilteredList(results: any[], Id: any) {
    this.productLists = results.filter( item => {
      //    console.log(item);
      if (item.subCatagoryId.indexOf( Id ) > -1) {
        return true;
      } else if (item.catagoryId.indexOf( Id ) > -1) {
        return true;
      } else if (item.catalogId.indexOf( Id ) > -1) {
        return true;
      } else {
        return false;
      }

    } );
    return this.productLists;
  }

  setRoot(newRootPage: any) {
    this.rootPage = newRootPage;
    // this.navCrt.setRoot(this.rootPage);
  }
}
