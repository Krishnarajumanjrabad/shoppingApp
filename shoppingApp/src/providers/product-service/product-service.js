var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import 'rxjs/add/operator/map';
/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ProductServiceProvider = /** @class */ (function () {
    function ProductServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        this.matchFound = false;
        console.log('Hello ProductServiceProvider Provider');
    }
    ProductServiceProvider.prototype.addProductCatalogToDb = function (productCatalog, productSpecificsInfos, productInformationDetailList, photoList) {
        var _this = this;
        var productInformation = null;
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
            };
            if (productInformation && photoList.length > 0) {
                return new Promise(function (resolve, reject) {
                    _this.db.list('/productCatalog').subscribe(function (result) {
                        console.log(result);
                        if (result.length > 0) {
                            result.forEach(function (item) {
                                console.log(item.productId);
                                if (item.productId == productCatalog.productId) {
                                    _this.matchFound = true;
                                }
                            });
                            if (!_this.matchFound) {
                                _this.productCatalogList.push(productInformation);
                                resolve(_this.productCatalogList);
                            }
                            else {
                                reject();
                            }
                        }
                        else {
                            console.log('if db exist and does not have any records');
                            _this.productCatalogList.push(productInformation);
                            resolve(_this.productCatalogList);
                        }
                    });
                }).catch(function (err) {
                    console.log("first time when db does not exist");
                    _this.productCatalogList.push(productInformation);
                    return _this.productCatalogList;
                    // resolve(this.productCatalogList);
                });
            }
        }
    };
    ProductServiceProvider.prototype.getProductCatalogList = function () {
        this.productCatalogList = this.db.list('/productCatalog', {
            query: {
                orderByChild: 'productId'
            }
        });
        return this.productCatalogList;
    };
    ProductServiceProvider.prototype.updateProductInventory = function (productList) {
        var _this = this;
        var url;
        var productComposition;
        return new Promise(function (resolve) {
            _this.productCatalogList = _this.getProductCatalogList();
            var _loop_1 = function (currentProduct) {
                console.log("printing the current product");
                console.log(currentProduct);
                _this.productCatalogList.subscribe(function (equivalentProduct) {
                    console.log(equivalentProduct);
                    equivalentProduct.forEach(function (item) {
                        console.log("printing the items from subsribe");
                        console.log(item);
                        var _loop_2 = function (p) {
                            var productCompositionResult = item.productSpecficationInfo[p];
                            console.log("printing the compoisition from item");
                            console.log(productCompositionResult);
                            currentProduct.productSpecficationInfo.forEach(function (currentProductComposition) {
                                if (productCompositionResult == currentProductComposition) {
                                    console.log("same match found");
                                    productComposition = {
                                        compositionType: currentProductComposition.compositionType,
                                        price: currentProductComposition.price,
                                        skuStock: currentProductComposition.skuStock - currentProduct.qty,
                                        unit: currentProductComposition.unit
                                    };
                                    console.log(productComposition);
                                    url = "/productCatalog/" + item.$key + "/productSpecficationInfo/" + p + "/";
                                    console.log(url);
                                    resolve(_this.db.object(url).set(productComposition));
                                    console.log(productComposition);
                                }
                            });
                        };
                        for (var p = 0; p < item.productSpecficationInfo.length; p++) {
                            _loop_2(p);
                        }
                    });
                });
            };
            for (var _i = 0, productList_1 = productList; _i < productList_1.length; _i++) {
                var currentProduct = productList_1[_i];
                _loop_1(currentProduct);
            }
        });
    };
    ProductServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], ProductServiceProvider);
    return ProductServiceProvider;
}());
export { ProductServiceProvider };
//# sourceMappingURL=product-service.js.map
