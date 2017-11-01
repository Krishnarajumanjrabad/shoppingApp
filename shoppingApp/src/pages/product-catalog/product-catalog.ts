import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";
import {ProductDetailPage} from "../product-detail/product-detail";
import {AngularFireOfflineDatabase} from "angularfire2-offline";

/**
 * Generated class for the ProductCatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-product-catalog',
  templateUrl: 'product-catalog.html',
} )
export class ProductCatalogPage {
  @ViewChild( Navbar ) navBar: Navbar;
  productsList: any[] = [];
  //checkForFilteredResults: any;
  tap: number = 0;
  filteredList: any[] = [];
  //private productList: any[] = [];
  // storage: Storage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireOfflineDatabase) {

    console.log( navParams.get( 'productLists' ) );
    if (navParams.get( 'productLists' ) != null) {
      this.filteredList = navParams.get( 'productLists' );

    }
    if (navParams.get( "shoppingCartProductList" )) {
      this.productsList = navParams.get( "shoppingCartProductList" );
      console.log( this.productsList );
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

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ProductCatalogPage' );
    // this.productsList=[];
  /*  this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      this.productsList;
      console.log( "getting the information from product Details" );
      console.log( this.productsList );
      this.navCtrl.setRoot( HomePage, {"shoppingCartProductList": this.productsList} );
    }*/
  }

  onModelChange(evt) {
    console.log( evt );
  }

  tapEvent(evt) {
    console.log( evt );
    this.tap++;
  }

  getProductDetailView(product) {
    console.log( product );
    if (product) {

      console.log( product.productId );
      if (this.productsList.length > 0) {
        //this.storage.setItem("shoppingCartList", this.productsList);
        this.navCtrl.push( ProductDetailPage, {
          'productInfo': product,
          'shoppingCartList': this.productsList
        } );
      } else {
        this.navCtrl.push( ProductDetailPage, {'productInfo': product} );
      }

    }
  }

  getProductItems(ev) {
    let searchVal = ev.target.value;
    console.log( searchVal );
    if (searchVal && searchVal.trim() != "") {
      this.db.list( 'productCatalog' ).subscribe( result => {
        this.filteredList = result;
        this.checkForFilteredResults( this.filteredList, searchVal );
      } );
    }
  }

  addProductToCart(product) {

    console.log( product );
    if (product) {
      this.productsList.push( product );
      //this.storage.setItem("shoppingCartList", this.productsList);
    }


  }

  showShoppingCart() {
    console.log( this.productsList.length );
    this.navCtrl.push( ShoppingCartPage, {shoppingLst: this.productsList} );
  }

  private checkForFilteredResults(filteredList: any[], searchVal: any) {
    this.filteredList = this.filteredList.filter( results => {
      console.log( results + results.productDesc );
      console.log( results.productDesc.toLowerCase() );

      if (results.productDesc.toLowerCase().indexOf( searchVal.toLowerCase() ) > -1) {
        return true;
      } else {
        return false;
      }


    } );
    return this.filteredList;
  }

}
