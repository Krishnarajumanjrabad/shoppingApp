import {Component} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage ()
@Component ( {
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
} )
export class OrderDetailPage {
  countryList: any[] = [];
  qty: number = 1;
  grandTotalPrice: number = 0;
  shippingPrice: number = 0;
  countryListNew: AfoListObservable<any[]>;
  private productList: any[] = [];
  private newqty: number;
  private price: number = 0;
  private totalPrice: number = 0;
  
  //private storage: Storage;
  
  constructor (public navCtrl: NavController, public navParams: NavParams, public db: AngularFireOfflineDatabase, public storage: NativeStorage) {
    
    if (navParams.get ( "orderplacementList" )) {
      this.productList = navParams.get ( "orderplacementList" );
      console.log ( this.productList );
      
    }
    
    /* if(storage.getItem("shoppingCartList") != null){
	   this.storage.getItem("shoppingCartList").then( data => {
		 this.productList = data;
		 console.log(this.productList);
	   }).catch(err => {
		 console.log(err);
	   });
	 }*/
    if (this.productList.length > 0) {
      console.log ( this.productList );
      this.totalPrice = 0;
      for (let product of this.productList) {
        if (product.productSpecficationInfo.length > 0) {
          for (let specification of product.productSpecficationInfo) {
            this.totalPrice += product.qty * specification.price;
          }
        }
        
        
      }
      
      this.grandTotalPrice = this.totalPrice + this.shippingPrice;
      
    }
    
    //Retrieve all the countries information
    /* this.db.list("/countries").subscribe(result =>{
	   console.log(result.$key + result.$value);
	   for(let itemsCountry of result){
		 console.log(itemsCountry.INDIA);
	   }
	   let items = Object.keys(result);
	   console.log(items);
	   items.forEach(states => {
		 console.log(states);
	   });
		  //console.log(result.$key + result.$value);
		  /!*result.forEach(countryItem => {
			console.log(countryItem);
			countryItem.forEach( stateItem => {
			  console.log(stateItem);
			})
		  })*!/
		 this.countryList = result;
  
	   }
  
	 );
	  console.log(this.countryList);
	}*/
    this.countryListNew = this.db.list ( "/countries" );
    console.log ( this.countryListNew );
    
  /*  for(let country of this.countryListNew){
      console.log(country.name);
    }*/
    /*this.countryListNew.subscribe(result => {
      result.states.forEach().then( res =>{
        console.log(res.name);
      });
     /!* for(let item of result){
        console.log(item.name);
       /!* for(let state of item.states){
          console.log(state);
        }*!/
      }*!/
    });*/
  }
  
  ionViewDidLoad () {
    console.log ( 'ionViewDidLoad OrderDetailPage' );
  }
  
  productRemove (product, i) {
    
    console.log ( product + "index" + i );
    if (product != null) {
      console.log ( i + product.productId );
      if (product.productSpecficationInfo.length > 0) {
        for (let specificationInfo of product.productSpecficationInfo) {
          this.totalPrice -= (product.qty * specificationInfo.price);
          this.grandTotalPrice -= (product.qty * specificationInfo.price);
          //this.totalPrice = temptotalPrice;
          console.log ( "productRemove" + this.totalPrice )
          
        }
        
        
        console.log ( "productRemove" + this.grandTotalPrice );
      }
      this.productList.splice ( i, 1 );
    }
    // this.storage.setItem( "shoppingCartList", this.shoppingList );
    console.log ( "prodct removal" + this.productList.length );
    return this.productList;
    
  }
  
  getGrandTotal () {
    console.log ( this.totalPrice );
    console.log ( this.shippingPrice );
    if (this.shippingPrice > 0) {
      this.grandTotalPrice = this.totalPrice + this.shippingPrice;
    } else {
      this.grandTotalPrice = this.totalPrice;
    }
    
  }
  
}
