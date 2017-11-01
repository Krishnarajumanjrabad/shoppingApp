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
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MenuServiceProvider = /** @class */ (function () {
    function MenuServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        console.log('Hello MenuServiceProvider Provider');
    }
    MenuServiceProvider.prototype.getMenuInfo = function () {
        this.menuList = this.db.list('/Menu');
        return this.menuList;
    };
    MenuServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], MenuServiceProvider);
    return MenuServiceProvider;
}());
export { MenuServiceProvider };
//# sourceMappingURL=menu-service.js.map
