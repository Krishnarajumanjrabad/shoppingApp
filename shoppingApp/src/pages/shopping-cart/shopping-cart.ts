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

@IonicPage()
@Component( {
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
} )
export class ShoppingCartPage {
  @ViewChild( Navbar ) navBar: Navbar;
  shippingPrice: number = 0;
  totalPrice: number = 0;
  qty: number = 0;
  price: number = 0;
  grandTotalPrice: number = 0;
//  private productList: any[] = [];
  private newqty: number = 0;
  //private productsList: any[] = [];
//  private productInfos: ShoppingCart;
  private shoppingList: any[] = [];
  // private productInfo: Product;
  private newShoppingList: any[] = [];

  //private storage: Storage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: NativeStorage, public utilityService: UtilityService) {
    this.shoppingList = null;
    if (navParams.get( "shoppingLst" )) {
      this.shoppingList = navParams.get( "shoppingLst" );
      console.log( "shopping cart const:" + this.shoppingList.length );
      this.newShoppingList = utilityService.buildProduct( this.shoppingList );


      this.shoppingList = [];
      this.shoppingList = this.newShoppingList;

    }
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ShoppingCartPage' );
   /* this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      this.shoppingList;
      console.log( this.shoppingList );
      this.navCtrl.push( ProductCatalogPage, {"shoppingCartProductList": this.shoppingList} );
    }*/

  }

  productRemove(product, i) {
    console.log( product + "index" + i );
    if (product != null) {
      console.log( i + product.productId );
      if (product.productSpecficationInfo.length > 0) {
        for (let specificationInfo of product.productSpecficationInfo) {
          product.totalPrice -= (product.qty * specificationInfo.price);
          product.grandTotalPrice -= product.totalPrice;
          //this.totalPrice = temptotalPrice;
          console.log( "productRemove" + product.totalPrice )
          console.log( "productRemove" + product.grandTotalPrice );
        }
      }
      this.shoppingList.splice( i, 1 );
    }
    // this.storage.setItem( "shoppingCartList", this.shoppingList );
    console.log( "prodct removal" + this.shoppingList.length );
    return this.shoppingList;
  }

  onModelQtyChange(evt) {
    this.newqty = 0;

    console.log( evt );
    this.newqty = parseInt( evt );
    console.log( this.newqty );
  }

  addProductToOrder() {
    console.log( "Call the add ProductPage " + this.shoppingList.length );
    this.navCtrl.push( OrderDetailPage, {"orderplacementList": this.shoppingList} );
  }

}
