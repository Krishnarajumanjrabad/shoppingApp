import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {
  matchFound: boolean = false;
  private productCatalogList: AfoListObservable<any[]>;

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log( 'Hello ProductServiceProvider Provider' );

  }

  addProductCatalogToDb(productCatalog, productSpecificsInfos, productInformationDetailList, photoList) {
    let productInformation = null;
    if (productSpecificsInfos != null && productInformationDetailList != null && photoList != null) {
      productInformation = {
        productId: productCatalog.productId,
        productDesc: productCatalog.productDesc,
        catalogId: productCatalog.catalogId,
        catagoryId: productCatalog.catagoryId,
        subCatagoryId: productCatalog.subCatagoryId,
        productType: productCatalog.productType,
        usage: productCatalog.direction,
        productSpecficationInfo: productSpecificsInfos,
        productInfoDetails: productInformationDetailList,
        productGallary: photoList
      }

      if (productInformation && photoList.length > 0) {
        return new Promise( (resolve, reject) => {
          this.db.list( '/productCatalog' ).subscribe( result => {
            console.log( result );
            if (result.length > 0) {
              result.forEach( item => {
                console.log( item.productId );
                if (item.productId == productCatalog.productId) {
                  this.matchFound = true;
                }
              } );
              if (!this.matchFound) {
                this.productCatalogList.push( productInformation );
                resolve( this.productCatalogList );
              } else {
                reject();
              }
            } else {
              console.log( 'if db exist and does not have any records' );
              this.productCatalogList.push( productInformation );
              resolve( this.productCatalogList );
            }
          } )
        } ).catch( err => {
          console.log( "first time when db does not exist" );
          this.productCatalogList.push( productInformation );
          return this.productCatalogList;
          // resolve(this.productCatalogList);
        } );
      }
    }

  }

  getProductCatalogList() {
    this.productCatalogList = this.db.list( '/productCatalog', {
      query: {
        orderByChild: 'productId'
      }
    } );
    return this.productCatalogList;
  }

  updateProductInventory(productList) {
    let url;
    let productComposition;
    return new Promise( resolve => {

      this.productCatalogList = this.getProductCatalogList();

      for (let currentProduct of productList) {
        console.log( "printing the current product" );
        console.log( currentProduct );
        this.productCatalogList.subscribe( equivalentProduct => {
          console.log( equivalentProduct );
          equivalentProduct.forEach( item => {
            console.log( "printing the items from subsribe" );
            console.log( item );
            for (let p = 0; p < item.productSpecficationInfo.length; p++) {
              let productCompositionResult = item.productSpecficationInfo[p];
              console.log( "printing the compoisition from item" );
              console.log( productCompositionResult );
              currentProduct.productSpecficationInfo.forEach( currentProductComposition => {
                if (productCompositionResult == currentProductComposition) {
                  console.log( "same match found" );
                  productComposition = {
                    compositionType: currentProductComposition.compositionType,
                    price: currentProductComposition.price,
                    skuStock: currentProductComposition.skuStock - currentProduct.qty,
                    unit: currentProductComposition.unit
                  }
                  console.log( productComposition );
                  url = "/productCatalog/" + item.$key + "/productSpecficationInfo/" + p + "/";
                  console.log( url );
                  resolve( this.db.object( url ).set( productComposition ) );
                  console.log( productComposition );

                }
              } );
            }


          } );
        } );
      }
    } );
  }

}
