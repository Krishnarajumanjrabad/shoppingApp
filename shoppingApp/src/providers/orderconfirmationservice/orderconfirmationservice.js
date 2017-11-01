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
  Generated class for the OrderconfirmationserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var OrderconfirmationserviceProvider = /** @class */ (function () {
    function OrderconfirmationserviceProvider(http, db) {
        this.http = http;
        this.db = db;
        console.log('Hello OrderconfirmationserviceProvider Provider');
    }
    OrderconfirmationserviceProvider.prototype.getOrderDetais = function () {
        this.orderDetailsList = this.db.list('/order');
        return this.orderDetailsList;
    };
    OrderconfirmationserviceProvider.prototype.saveOrderDetails = function (orderForm, productList, grandTotalPrice, orderId, userInfo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.orderDetailsList = _this.db.list('/order');
            if (userInfo && userInfo != "undefined" && userInfo != null) {
                _this.orderInformation = {
                    "orderid": orderId,
                    "orderDetail": orderForm.value,
                    "productList": productList,
                    "totalAmount": grandTotalPrice,
                    "user": userInfo
                };
            }
            else {
                _this.orderInformation = {
                    "orderid": orderId,
                    "orderDetail": orderForm.value,
                    "productList": productList,
                    "totalAmount": grandTotalPrice
                };
            }
            _this.orderDetailsList.push(_this.orderInformation);
            resolve(_this.orderInformation);
            return;
        });
    };
    OrderconfirmationserviceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], OrderconfirmationserviceProvider);
    return OrderconfirmationserviceProvider;
}());
export { OrderconfirmationserviceProvider };
//# sourceMappingURL=orderconfirmationservice.js.map
