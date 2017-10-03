import {Component, ViewChild} from '@angular/core';
import {Nav, NavParams, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {MenuServiceProvider} from "../providers/menu-service/menu-service";
import {AfoListObservable} from "angularfire2-offline";
import {CatalogPage} from "../pages/catalog/catalog";
import {CategoryPage} from "../pages/category/category";
import {ProductPage} from "../pages/product/product";
import {SubcategoryPage} from "../pages/subcategory/subcategory";
import {CatalogServiceProvider} from "../providers/catalog-service/catalog-service";
import {CatagoryServiceProvider} from "../providers/catagory-service/catagory-service";
import {SubCatagoryServiceProvider} from "../providers/sub-catagory-service/sub-catagory-service";
import {ProductServiceProvider} from "../providers/product-service/product-service";
import {ProductCatalogPage} from "../pages/product-catalog/product-catalog";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  productLists: any[] = [];
  @ViewChild(Nav) nav: Nav;
 // @ViewChild(NavParams) navParams: NavParams;
 // @ViewChild(NavParams) params: NavParams;
  rootPage: any = HomePage;
  pages: any[] = ['Create Catalog', 'Create Category', 'Create SubCategory', 'Create Product'];
  filteredList: any[];
  productList: AfoListObservable<any[]>;
  productsList: any[];
  showLevel1 = null;
  showLevel2 = null;
  catagoryList: AfoListObservable<any[]>;
  menuList: AfoListObservable<any[]>;
  catalogList: AfoListObservable<any[]>;
  subCatagoryList: AfoListObservable<any[]>;

  constructor(public platform: Platform,
              public subCatagoryService: SubCatagoryServiceProvider,
              public catagoryService: CatagoryServiceProvider,
              public catalogService: CatalogServiceProvider,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menuService: MenuServiceProvider,
              public productService: ProductServiceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.menuList = menuService.getMenuInfo();

    this.catalogList = catalogService.getCatalogServiceList();

    this.catagoryList = catagoryService.getCatagoryList();

    this.productList = productService.getProductCatalogList();

    this.subCatagoryList = subCatagoryService.getSubCatagoryList();

   /* if(this.nav.rootParams.get('shoppingCartProductList')){
      this.productsList = this.nav.rootParams.get("shoppingCartProductList");
      console.log("app menu catalog page");
      console.log(this.productsList.length);
      console.log(this.productsList);
    }*/

  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if (page == 'Create Catalog') {
      this.nav.push(CatalogPage);
    } else if (page == "Create Category") {
      this.nav.push(CategoryPage);
    } else if (page == "Create SubCategory") {
      this.nav.push(SubcategoryPage);
    } else if (page == "Create Product") {
      this.nav.push(ProductPage);
    }

  }

  showProductWithCatalogId(catalogId) {
    console.log("Displaying the product by catalog ID:" + catalogId);

    this.productList.subscribe(items => {
      this.productLists = this.getFilteredList(items, catalogId);

    });
    // console.log(this.productList)
   // this.nav.push(ProductCatalogPage, {productLists: this.productLists});
    this.pushToPage(this.productLists);
  }

  showProductWithCatagoryId(catagoryId) {
    this.productList.subscribe(items => {
      this.productLists = this.getFilteredList(items, catagoryId);
    });
    //console.log();
    this.pushToPage(this.productLists);

  }



  showProductWithSubCatagoryId(subCatagoryId) {
    console.log(subCatagoryId);
    this.productList.subscribe(results => {

      this.productLists = this.getFilteredList(results, subCatagoryId);

    });
    console.log(this.productLists);
   // this.nav.push(ProductCatalogPage,{productLists: this.productLists});
    this.pushToPage(this.productLists);
  }

  pushToPage(productLists){
    if(productLists){
      this.nav.push(ProductCatalogPage,{productLists: this.productLists});
    }
    /*if(this.productsList.length > 0) {
      this.nav.push(ProductCatalogPage,{"productLists": this.productLists, "shoppingCartProductList": this.productsList} );
    } else {
      this.nav.push(ProductCatalogPage,{"productLists": this.productLists});
    }
*/

  }

  private getFilteredList(results: any[], Id: any) {
    this.productLists = results.filter(item => {
      //    console.log(item);
      if (item.subCatagoryId.indexOf(Id) > -1) {
        return true;
      } else if (item.catagoryId.indexOf(Id) > -1) {
        return true;
      } else if (item.catalogId.indexOf(Id) > -1) {
        return true;
      } else {
        return false;
      }

    });
    return this.productLists;
  }
}
