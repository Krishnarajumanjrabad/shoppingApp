import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {DateTimeData} from "ionic-angular/util/datetime-util";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";
import {OrderDetailPage} from "../order-detail/order-detail";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'product-detail',
  templateUrl: 'product-detail.html',

} )
export class ProductDetailPage {
  @ViewChild( Navbar ) navBar: Navbar;
  qty: number = 1;
  totalPrice: number = 0;
  shippingPrice: number = 0;
  tap: number = 0;
  rate: number = 0;
  user: string = "";
  email: string = "";
  comments: string = "";
  createDate: DateTimeData;
  starsCount: number;
  starsCounts: number[] = [];
  private productInfo: any;
  private reviewCommentsList: AfoListObservable<any[]>;
  private reviewUserMatchFound: boolean = false;
  private productsList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: NativeStorage, public db: AngularFireOfflineDatabase) {
    this.productInfo = navParams.get( "productInfo" );
    if (this.navParams.get( "shoppingCartList" ) != null) {
      this.productsList = [];
      this.productsList = this.navParams.get( "shoppingCartList" );
      console.log( this.productsList );
      console.log( this.productsList.length );
    }

    /*    if(storage.getItem("shoppingCartList") != null){
          this.storage.getItem("shoppingCartList").then( data => {
            this.productsList = data;
            console.log(this.productsList);
          }).catch(err => {
            console.log(err);
          });
        }*/

    this.reviewCommentsList = this.db.list( '/reviewComments', {
      query: {
        orderByChild: 'rating'
      }
    } );
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ProductDetailPage' );

    // this.productsList=[];
    this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      this.productsList;
      console.log( "getting the information from product Details" );
      console.log( this.productsList );
      this.navCtrl.pop();
    }


  }

  tapEvent(evt) {
    this.tap++;
    console.log( this.tap );
  }

  addProductToCart(product) {
    this.productsList = [];
    console.log( product );
    if (product) {

      this.productsList.push( product );

    }

  }

  showShoppingCart(productList) {
    // this.productsList=null;
    console.log( productList.length );

    this.navCtrl.push( ShoppingCartPage, {"shoppingLst": this.productsList} );

  }

  buyProducts(productInfo) {
    if (productInfo) {
      this.productsList.push( productInfo );

      //   this.storage.setItem("shoppingCartList", this.productsList);
      this.navCtrl.push( OrderDetailPage, {"orderplacementList": this.productsList} );
    }
  }

  onModelChange(event) {
    this.rate = event;
    console.log( event );
    console.log( this.rate );
  }

  reviewSubit(reviewForm: NgForm, productId: string) {
    console.log( reviewForm.value + reviewForm.valid );
    if (reviewForm.valid && productId != null) {
      console.log( 'ínside the valid form' + reviewForm.value.user );
      let reviewComments = {
        productId: productId,
        name: reviewForm.value.user,
        email: reviewForm.value.email,
        comments: reviewForm.value.comments,
        rating: this.rate,
        createdDate: new Date().toUTCString()
      };

      this.reviewCommentsList = this.db.list( '/reviewComments', {
        query: {
          orderByChild: 'rating'
        }
      } );

      if (this.reviewCommentsList != null) {

        this.reviewCommentsList.subscribe( results => {
          console.log( results );
          // this.reviewUserMatchFound = false;
          if (results.length > 0) {
            for (let item of results) {
              console.log( item.user );
              if (item.email.toLowerCase() === reviewForm.value.email.toLowerCase()) {
                this.reviewUserMatchFound = true;
                break;
              }
            }
            if (!this.reviewUserMatchFound) {
              this.reviewCommentsList.push( reviewComments );
            }
          } else {
            console.log( 'this is first time inserting the review comments' );
            this.reviewCommentsList.push( reviewComments );
          }
        } );
      }
    }


  }
}
