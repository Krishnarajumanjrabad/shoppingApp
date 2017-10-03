export class ProductSpecificsInfo {

  private unit: string = "";
  private compositionType: string = "";
  private price: number = 0;
  private skuStock: number = 0;


  constructor(unit: string, compositionType: string, price: number, skuStock: number) {
    this.unit = unit;
    this.compositionType = compositionType;
    this.price = price;
    this.skuStock = skuStock;
  }


}
