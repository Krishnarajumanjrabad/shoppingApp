import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  productsList: any[] = [];
  //checkForFilteredResults: any;
  tap: number = 0;
  filteredList: any[] = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireOfflineDatabase) {

    if (navParams.get('productLists') != null) {
      this.filteredList = navParams.get('productLists');

    }
    if(navParams.get("shoppingCartProductList")){
      this.productsList = navParams.get("shoppingCartProductList");
      console.log("homepage");
      console.log(this.productsList.length);
      console.log(this.productsList);
    }

  }

  onModelChange(evt) {
    console.log(evt);
  }

  tapEvent(evt) {
    console.log(evt);
    this.tap++;
  }

  getProductDetailView(product) {
    console.log(product);
    if (product) {
      console.log(product.productId);
      this.navCtrl.push(ProductDetailPage, {'productInfo': product});
    }
  }

  getProductItems(ev) {
    let searchVal = ev.target.value;
    console.log(searchVal);
    if (searchVal && searchVal.trim() != "") {
      this.db.list('productCatalog').subscribe(result => {
        this.filteredList=result;
        this.checkForFilteredResults(this.filteredList, searchVal);
      });
    }
  }

  private checkForFilteredResults(filteredList: any[], searchVal: any) {
    this.filteredList = this.filteredList.filter(results => {
      console.log(results + results.productDesc);
      console.log(results.productDesc.toLowerCase());

      if (results.productDesc.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }


    });
    return this.filteredList;
  }

  addProductToCart(product){
    console.log(product);
    if(product){
      this.productsList.push(product);

    }

  }

  showShoppingCart(){
    console.log(this.productsList.length);
    if(this.productsList.length > 0){
      this.navCtrl.push(ShoppingCartPage, { shoppingLst: this.productsList});
    }
  }
}
