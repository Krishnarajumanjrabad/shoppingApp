var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";

/**
 * Generated class for the CatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CatalogPage = /** @class */ (function () {
    function CatalogPage(navCtrl, alertCrtl, navParams, fb, catalogService) {
        this.navCtrl = navCtrl;
        this.alertCrtl = alertCrtl;
        this.navParams = navParams;
        this.fb = fb;
        this.catalogService = catalogService;
        this.newCatalogList = Array();
        this.alreadyExist = false;
        this.catalogForm = fb.group({
            'catalogId': ['', Validators.required],
            'catalogDesc': ['', Validators.required]
        });
        this.catalogId = this.catalogForm.controls['catalogId'];
        this.catalogDesc = this.catalogForm.controls['catalogDesc'];
    }
    CatalogPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CatalogPage');
        this.catalogList = this.catalogService.getCatalogServiceList();
    };
    CatalogPage.prototype.cataLogSubmit = function (form) {
        var _this = this;
        console.log(" inside the form submission");
        if (form) {
            this.catalogService.addCatalog(form).then(function (result) {
                console.log(result);
                _this.showAlert();
                _this.catalogForm.reset();
                _this.ionViewDidLoad();
            }).catch(function (err) {
                console.log("error while inserting the records" + err);
                _this.showErrorAlert();
            });
        }
    };
    CatalogPage.prototype.catalogRemove = function (item) {
        console.log("Printing the item: " + item);
        this.catalogService.deleteCatalogItem(item);
    };
    CatalogPage.prototype.showAlert = function () {
        this.errorMessage = this.alertCrtl.create({
            title: "Catalog Notification Alert",
            message: 'Item is stored to the catalog',
            buttons: [
                {
                    text: 'Okay',
                    handler: function () {
                        //this.navCtrl.push(HomePage);
                        return null;
                    }
                }
            ]
        });
        this.errorMessage.present();
    };
    CatalogPage.prototype.showErrorAlert = function () {
        var alertErr = this.alertCrtl.create({
            title: "Catalog Notification Alert",
            message: 'Item is already exists',
            buttons: [
                {
                    text: 'Okay',
                    handler: function () {
                        return null;
                    }
                }
            ]
        });
        alertErr.present();
    };
    CatalogPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-catalog',
            templateUrl: 'catalog.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController, NavParams, FormBuilder, CatalogServiceProvider])
    ], CatalogPage);
    return CatalogPage;
}());
export { CatalogPage };
//# sourceMappingURL=catalog.js.map
