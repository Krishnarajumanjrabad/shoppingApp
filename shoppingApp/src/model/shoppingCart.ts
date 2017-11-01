import {Product} from "./product";

export class ShoppingCart {
  productInformation: Product;


  constructor(productInfo: Product) {
    this.productInformation = productInfo;
  }
}
