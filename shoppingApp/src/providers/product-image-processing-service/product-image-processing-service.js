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
  Generated class for the ProductImageProcessingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ProductImageProcessingServiceProvider = /** @class */ (function () {
    //provided the construction injection for access the database offline
    function ProductImageProcessingServiceProvider(http, db) {
        this.http = http;
        this.db = db;
        this.DB_NAME = '/productCatalog';
        console.log('Hello ProductImageProcessingService Provider');
    }
    //Retrieving all the uploaded image files
    ProductImageProcessingServiceProvider.prototype.getUploadedFile = function () {
        this.files = this.db.list(this.DB_NAME);
        return this.files;
    };
    //Saving the uploaded files to existing list and firebase db.
    ProductImageProcessingServiceProvider.prototype.addFileServices = function (fileInfo) {
        var _this = this;
        //console.log(fileName);
        return new Promise(function (resolve, reject) {
            _this.files = _this.db.list(_this.DB_NAME);
            //Created the ID for accessing the uploaded image files
            var gallaryPhtoto = {
                gallary: fileInfo
            };
            _this.files.push(gallaryPhtoto);
            resolve(_this.files);
            console.log('insert the file to the list');
        });
    };
    ProductImageProcessingServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase])
    ], ProductImageProcessingServiceProvider);
    return ProductImageProcessingServiceProvider;
}());
export { ProductImageProcessingServiceProvider };
//# sourceMappingURL=product-image-processing-service.js.map
