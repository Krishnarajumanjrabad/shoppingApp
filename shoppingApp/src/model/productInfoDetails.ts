export class ProductInfoDetails {
  ingridents: string;
  productCompositionType: string;
  qty: number;


  constructor(ingridents: string, productCompositionType: string, qty: number) {
    this.ingridents = ingridents;
    this.productCompositionType = productCompositionType;
    this.qty = qty;
  }
}
