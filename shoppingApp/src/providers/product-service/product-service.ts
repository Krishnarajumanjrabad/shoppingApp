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
    console.log('Hello ProductServiceProvider Provider');

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
      console.log(productInformation);
      if (productInformation && photoList.length > 0) {
        return new Promise((resolve, reject) => {
          this.db.list('/productCatalog').subscribe(result => {
            console.log(result);
            if (result.length > 0) {
              result.forEach(item => {
                console.log(item.productId);
                if (item.productId == productCatalog.productId) {
                  this.matchFound = true;
                }
              });
              if (!this.matchFound) {
                this.productCatalogList.push(productInformation);
                resolve(this.productCatalogList);
              } else {
                reject();
              }
            } else {
              console.log('if db exist and does not have any records');
              this.productCatalogList.push(productInformation);
              resolve(this.productCatalogList);
            }
          })
        }).catch(err => {
          console.log("first time when db does not exist");
          this.productCatalogList.push(productInformation);
          return this.productCatalogList;
          // resolve(this.productCatalogList);
        });
      }
    }

  }

  getProductCatalogList() {
    this.productCatalogList = this.db.list('/productCatalog', {
      query: {
        orderByChild: 'productId'
      }
    });
    return this.productCatalogList;
  }
}
