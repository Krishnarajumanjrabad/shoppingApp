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
import {SubCatagoryServiceProvider} from "../../providers/sub-catagory-service/sub-catagory-service";

/**
 * Generated class for the SubcategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubcategoryPage = /** @class */ (function () {
    function SubcategoryPage(navCtrl, alertCrtl, fb, subCatagoryService, catalogService, catagoryService, navParams) {
        this.navCtrl = navCtrl;
        this.alertCrtl = alertCrtl;
        this.fb = fb;
        this.subCatagoryService = subCatagoryService;
        this.catalogService = catalogService;
        this.catagoryService = catagoryService;
        this.navParams = navParams;
        this.subCatagoryForm = fb.group({
            'catalogId': ['', Validators.required],
            'catagoryId': ['', Validators.required],
            'subCatagoryId': ['', Validators.required],
            'subCatagoryDesc': ['', Validators.required]
        });
        this.catalogId = this.subCatagoryForm.controls['catalogId'];
        this.catagoryId = this.subCatagoryForm.controls['catagoryId'];
        this.subCatagoryId = this.subCatagoryForm.controls['subCatagoryId'];
        this.subCatagoryDesc = this.subCatagoryForm.controls['subCatagoryDesc'];
    }
    SubcategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubcategoryPage');
        this.catalogList = this.catalogService.getCatalogServiceList();
        this.catagoryList = this.catagoryService.getCatagoryList();
        this.subCatagoryList = this.subCatagoryService.getSubCatagoryList();
    };
    SubcategoryPage.prototype.subCatagorySubmit = function (form) {
        var _this = this;
        console.log(form);
        this.subCatagoryService.saveSubCatagory(form).then(function (res) {
            console.log(res);
            _this.showAlert();
            _this.subCatagoryForm.reset();
            _this.ionViewDidLoad();
        }).catch(function (err) {
            console.log("error while inserting the records" + err);
            _this.showErrorAlert();
        });
    };
    SubcategoryPage.prototype.showAlert = function () {
        this.errorMessage = this.alertCrtl.create({
            title: "Sub Category Notification Alert",
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
    SubcategoryPage.prototype.showErrorAlert = function () {
        var alertErr = this.alertCrtl.create({
            title: "Sub Category Notification Alert",
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
    SubcategoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-subcategory',
            templateUrl: 'subcategory.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController, FormBuilder, SubCatagoryServiceProvider, CatalogServiceProvider, CatagoryServiceProvider, NavParams])
    ], SubcategoryPage);
    return SubcategoryPage;
}());
export { SubcategoryPage };
//# sourceMappingURL=subcategory.js.map
