var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from "../model/product";

var UtilityService = /** @class */ (function () {
    function UtilityService(http) {
        this.http = http;
        this.shoppingList = [];
        this.tempShoppingList = [];
        this.totalPrice = 0;
        this.grandTotalPrice = 0;
        this.shippingPrice = 0;
        console.log('Hello UtilityService  Provider');
    }
    UtilityService.prototype.buildProduct = function (productList) {
        console.log("utilityServoce:" + productList.length);
        this.tempShoppingList = [];
        for (var _i = 0, productList_1 = productList; _i < productList_1.length; _i++) {
            var product = productList_1[_i];
            if (product) {
                for (var _a = 0, _b = product.productSpecficationInfo; _a < _b.length; _a++) {
                    var specification = _b[_a];
                    this.totalPrice = specification.price * product.qty;
                    this.grandTotalPrice = this.totalPrice + this.shippingPrice;
                }
                this.productInfo = new Product(product.catalogId, product.catagoryId, product.productDesc, product.productGallary, product.productId, product.productInfoDetails, product.productSpecficationInfo, product.productType, product.subCatagoryId, product.usage, product.qty, this.totalPrice, this.grandTotalPrice, this.shippingPrice);
                // this.productInfos = new ShoppingCart(this.productInfo);
                this.tempShoppingList.push(this.productInfo);
            }
        }
        return this.tempShoppingList;
    };
    UtilityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
//# sourceMappingURL=utilityService.js.map
