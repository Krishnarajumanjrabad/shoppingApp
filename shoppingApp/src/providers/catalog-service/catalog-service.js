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
  Generated class for the CatalogServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CatalogServiceProvider = /** @class */ (function () {
    function CatalogServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        this.confirmMatchFound = false;
        this.matchExist = false;
        console.log('Hello CatalogServiceProvider Provider');
    }
    CatalogServiceProvider.prototype.getCatalogServiceList = function () {
        this.cataLogList = this.db.list("/catalog", {
            query: {
                orderByChild: "catalogId"
            }
        });
        return this.cataLogList;
    };
    CatalogServiceProvider.prototype.addCatalog = function (form) {
        var _this = this;
        if (form) {
            this.cataLogList = this.db.list("/catalog", {
                query: {
                    orderByChild: "catalogId"
                }
            });
            return new Promise(function (resolve, reject) {
                _this.cataLogList.subscribe(function (result) {
                    console.log(result);
                    if (result.length > 0) {
                        _this.matchExist = _this.confirmMatchExist(result, form);
                        console.log(_this.matchExist);
                    }
                    else {
                        console.log("this is first time record is inserted in to DB");
                        resolve(_this.cataLogList.push(form));
                    }
                });
                if (!_this.matchExist) {
                    //this.cataLogList.push(form);
                    resolve(_this.cataLogList.push(form));
                }
                else {
                    reject();
                }
            });
        }
    };
    CatalogServiceProvider.prototype.deleteCatalogItem = function (item) {
        if (item)
            this.cataLogList.remove(item);
    };
    CatalogServiceProvider.prototype.confirmMatchExist = function (result, form) {
        this.matchExist = false;
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var item = result_1[_i];
            if (form.catalogId === item.catalogId) {
                // console.log("same catalog id is found");
                this.matchExist = true;
                break;
            }
        }
        //console.log(this.matchExist);
        return this.matchExist;
    };
    CatalogServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], CatalogServiceProvider);
    return CatalogServiceProvider;
}());
export { CatalogServiceProvider };
//# sourceMappingURL=catalog-service.js.map
