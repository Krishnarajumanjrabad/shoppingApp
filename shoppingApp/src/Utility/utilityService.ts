import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from "../model/product";


@Injectable()
export class UtilityService {

  shoppingList: any[] = [];
  tempShoppingList: any[] = [];
  totalPrice: number = 0;
  grandTotalPrice: number = 0;
  productInfo: Product;
  shippingPrice: number =0;

  constructor(public http: Http) {
    console.log('Hello UtilityService  Provider');

  }



  buildProduct(productList) {
    console.log("utilityServoce:" + productList.length);

   this.tempShoppingList = [];
   console.log(this.tempShoppingList);
    for (let product of productList) {


      console.log( product );
      if (product) {

        for (let specification of product.productSpecficationInfo) {
          console.log("printing the specification"+ specification.price + "  " + product.qty);

          this.totalPrice = specification.price * product.qty;
          //product.totalPrice += this.totalPrice;
          console.log("product price:"+this.totalPrice);
          this.grandTotalPrice = this.totalPrice + this.shippingPrice;
          console.log("grand total"+this.grandTotalPrice);
       }

        this.productInfo = new Product(
          product.catalogId,
          product.catagoryId,
          product.productDesc,
          product.productGallary,
          product.productId,
          product.productInfoDetails,
          product.productSpecficationInfo,
          product.productType,
          product.subCatagoryId,
          product.usage,
          product.qty,
          this.totalPrice,
          this.grandTotalPrice,
          this.shippingPrice
      );

        // this.productInfos = new ShoppingCart(this.productInfo);
        this.tempShoppingList.push( this.productInfo );

      }
    }
    console.log( this.tempShoppingList.length );
   /* this.shoppingList = [];
    this.shoppingList = this.tempShoppingList;
    console.log(this.shoppingList);*/
    return this.tempShoppingList;
  }
}
