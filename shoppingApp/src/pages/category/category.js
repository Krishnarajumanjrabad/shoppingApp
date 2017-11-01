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
import {CatagoryServiceProvider} from "../../providers/catagory-service/catagory-service";
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";

/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CategoryPage = /** @class */ (function () {
    function CategoryPage(navCtrl, alertCrtl, fb, catagoryService, navParams, catalogService) {
        this.navCtrl = navCtrl;
        this.alertCrtl = alertCrtl;
        this.fb = fb;
        this.catagoryService = catagoryService;
        this.navParams = navParams;
        this.catalogService = catalogService;
        this.catagoryForm = fb.group({
            'catagoryId': ['', Validators.required],
            'catagoryDesc': ['', Validators.required],
            'catalogId': ['', Validators.required]
        });
        this.catagoryId = this.catagoryForm.controls['catagoryId'];
        this.catagoryDesc = this.catagoryForm.controls['catagoryDesc'];
        this.catalogId = this.catagoryForm.controls['catalogId'];
    }
    CategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
        this.catalogList = this.catalogService.getCatalogServiceList();
        this.catagoryList = this.catagoryService.getCatagoryList();
    };
    CategoryPage.prototype.catagorySubmit = function (form) {
        var _this = this;
        this.catagoryService.saveCatagory(form).then(function (res) {
            _this.showAlert();
            _this.catagoryForm.reset();
            _this.ionViewDidLoad();
        }).catch(function (err) {
            console.log("error while inserting the records" + err);
            _this.showErrorAlert();
        });
    };
    CategoryPage.prototype.showAlert = function () {
        this.errorMessage = this.alertCrtl.create({
            title: "Catagory Notification Alert",
            message: 'Item is stored to the Catagory',
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
    CategoryPage.prototype.showErrorAlert = function () {
        var alertErr = this.alertCrtl.create({
            title: "Catagory Notification Alert",
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
    CategoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-category',
            templateUrl: 'category.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController, FormBuilder, CatagoryServiceProvider, NavParams, CatalogServiceProvider])
    ], CategoryPage);
    return CategoryPage;
}());
export { CategoryPage };
//# sourceMappingURL=category.js.map
