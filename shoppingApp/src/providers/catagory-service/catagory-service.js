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
  Generated class for the CatagoryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CatagoryServiceProvider = /** @class */ (function () {
    function CatagoryServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        this.matchExist = false;
        console.log('Hello CatagoryServiceProvider Provider');
    }
    CatagoryServiceProvider.prototype.saveCatagory = function (form) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (form) {
                _this.catagoryList = _this.db.list("/catagory", {
                    query: {
                        orderByChild: "çatagoryId"
                    }
                });
                _this.catagoryList.subscribe(function (result) {
                    console.log(result);
                    if (result.length > 0) {
                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                            var item = result_1[_i];
                            if (item.catagoryId === form.catagoryId) {
                                _this.matchExist = true;
                                break;
                            }
                        }
                    }
                    else {
                        console.log("this is first case of catagory entry to db");
                        _this.catagoryList.push(form);
                    }
                });
            }
            if (!_this.matchExist) {
                //this.cataLogList.push(form);
                resolve(_this.catagoryList.push(form));
            }
            else {
                reject();
            }
        });
    };
    CatagoryServiceProvider.prototype.getCatagoryList = function () {
        this.catagoryList = this.db.list("/catagory", {
            query: {
                orderByChild: 'çatagoryId'
            }
        });
        return this.catagoryList;
    };
    CatagoryServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], CatagoryServiceProvider);
    return CatagoryServiceProvider;
}());
export { CatagoryServiceProvider };
//# sourceMappingURL=catagory-service.js.map
