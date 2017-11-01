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
  Generated class for the SubCatagoryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var SubCatagoryServiceProvider = /** @class */ (function () {
    function SubCatagoryServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        this.matchExist = false;
        console.log('Hello SubCatagoryServiceProvider Provider');
    }
    SubCatagoryServiceProvider.prototype.getSubCatagoryList = function () {
        this.subCatagoryList = this.db.list('/subCatagory', {
            query: {
                orderByChild: 'subCatagoryId'
            }
        });
        return this.subCatagoryList;
    };
    SubCatagoryServiceProvider.prototype.saveSubCatagory = function (form) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (form) {
                _this.subCatagoryList = _this.db.list("/subCatagory", {
                    query: {
                        orderByChild: "subCatagoryId"
                    }
                });
                _this.subCatagoryList.subscribe(function (result) {
                    console.log(result);
                    if (result.length > 0) {
                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                            var item = result_1[_i];
                            if (item.subCatagoryId === form.subCatagoryId) {
                                _this.matchExist = true;
                                break;
                            }
                        }
                    }
                    else {
                        console.log("this is first case of catagory entry to db");
                        _this.subCatagoryList.push(form);
                    }
                });
            }
            if (!_this.matchExist) {
                //this.cataLogList.push(form);
                resolve(_this.subCatagoryList.push(form));
            }
            else {
                reject();
            }
        });
    };
    SubCatagoryServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], SubCatagoryServiceProvider);
    return SubCatagoryServiceProvider;
}());
export { SubCatagoryServiceProvider };
//# sourceMappingURL=sub-catagory-service.js.map
