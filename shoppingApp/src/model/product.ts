import {ProductSpecificsInfo} from "./productSpecificsInfo";
import {ProductImage} from "./productImage";
import {ProductInfoDetails} from "./productInfoDetails";

export class Product{
  catagoryId:string;
  catalogId:string;
  productDesc:string;
  productGallary:ProductImage[];
  productId: string;
  productInfoDetails:ProductInfoDetails[];
  productSpecficationInfo:ProductSpecificsInfo[];
  productType: string;
  subCatagoryId: string;
  usage: string;
  qty: number = 0;
  totalPrice: number = 0;
  grandTotalPrice: number = 0;
  shippingPrice: number = 0;


  constructor(catagoryId: string, catalogId: string, productDesc: string, productGallary: ProductImage[], productId: string, productInfoDetails: ProductInfoDetails[], productSpecficationInfo: ProductSpecificsInfo[], productType: string, subCatagoryId: string, usage: string, qty: number, totalPrice: number, grandTotalPrice: number, shippingPrice: number) {
    this.catagoryId = catagoryId;
    this.catalogId = catalogId;
    this.productDesc = productDesc;
    this.productGallary = productGallary;
    this.productId = productId;
    this.productInfoDetails = productInfoDetails;
    this.productSpecficationInfo = productSpecficationInfo;
    this.productType = productType;
    this.subCatagoryId = subCatagoryId;
    this.usage = usage;
    this.qty = qty;
    this.totalPrice = totalPrice;
    this.grandTotalPrice = grandTotalPrice;
    this.shippingPrice = shippingPrice;
  }
}
