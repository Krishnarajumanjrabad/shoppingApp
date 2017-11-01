var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {CatagoryServiceProvider} from "../../providers/catagory-service/catagory-service";
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {SubCatagoryServiceProvider} from "../../providers/sub-catagory-service/sub-catagory-service";
/*
class ProductSpecificsInfoSpecific {
  unit: string = "";
  compositionType: string = "";
  price: number = 0;
  skuStock: number = 0;
}*/
/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductPage = /** @class */ (function () {
    function ProductPage(navCtrl, loadingCtrl, fileService, alertCrtl, fb, subCatagoryService, catalogService, catagoryService, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.fileService = fileService;
        this.alertCrtl = alertCrtl;
        this.fb = fb;
        this.subCatagoryService = subCatagoryService;
        this.catalogService = catalogService;
        this.catagoryService = catagoryService;
        this.navParams = navParams;
        this.photoList = [];
        this.finalProductList = [];
        this.productTypes = [
            "Cream", "Tablets", "Capsules", "Tonics", "Oil", "Syrups", "Asavas", "Aristas", "Lehas", "Pakas Malt", "Ointments", "Medicainal Set"
        ];
        this.productCompositions = ["ml", "g", "kg", "sheet", "numbers", "SET"];
        this.productSpecificsInfos = [];
        this.noteMessage = "Please select the file";
        this.productInformationDetailList = [];
        this.productForm = fb.group({
            'catalogId': ['', Validators.required],
            'catagoryId': [''],
            'subCatagoryId': [''],
            'productId': ['', Validators.required],
            'productDesc': ['', Validators.required],
            'productType': ['', Validators.required],
            'direction': ['', Validators.required]
        });
        this.catalogId = this.productForm.controls['catalogId'];
        this.catagoryId = this.productForm.controls['catagoryId'];
        this.subCatagoryId = this.productForm.controls['subCatagoryId'];
        this.productId = this.productForm.controls['productId'];
        this.productDesc = this.productForm.controls['productDesc'];
        this.productType = this.productForm.controls['productType'];
        this.direction = this.productForm.controls['direction'];
        this.surveyForm = fb.group({
            'unit': ['', Validators.required],
            'compositionType': ['', Validators.required],
            'price': ['', Validators.required],
            'skuStock': ['', Validators.required]
        });
        this.unit = this.surveyForm.controls['unit'];
        this.compositionType = this.surveyForm.controls['compositionType'];
        this.price = this.surveyForm.controls['price'];
        this.skuStock = this.surveyForm.controls['skuStock'];
        this.productInformationForm = fb.group({
            'ingredients': ['', Validators.required],
            'productcompositionType': ['', Validators.required],
            'qty': ['', Validators.required]
        });
        this.ingredients = this.productInformationForm.controls['ingredients'];
        this.productcompositionType = this.productInformationForm.controls['productcompositionType'];
        this.qty = this.productInformationForm.controls['qty'];
    }
    ProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductPage');
        this.catalogList = this.catalogService.getCatalogServiceList();
        this.catagoryList = this.catagoryService.getCatagoryList();
        this.subCatagoryList = this.subCatagoryService.getSubCatagoryList();
        this.finalProductsList = this.fileService.getProductCatalogList();
    };
    ProductPage.prototype.addItemToProductSpecificInfos = function (item) {
        if (item) {
            this.productSpecificsInfos.push(item);
        }
        this.surveyForm.reset();
        return this.productSpecificsInfos;
    };
    ProductPage.prototype.removeItem = function (i) {
        if (i == 0) {
            this.productSpecificsInfos.splice(i);
        }
        else {
            this.productSpecificsInfos.splice(i, 1);
        }
        return this.productSpecificsInfos;
    };
    ProductPage.prototype.addItemToProductInformationDetails = function (item) {
        if (item) {
            this.productInformationDetailList.push(item);
        }
        this.productInformationForm.reset();
        return this.productInformationDetailList;
    };
    ProductPage.prototype.productSubmit = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait content is saving...'
        });
        loading.present();
        //console.log(form);
        if (form) {
            var files_1 = this.nativeInputBtn.nativeElement.files;
            //Check whether file is browsed while clicking the upload button
            if (files_1.length == 0) {
                this.showAlert();
                return null;
            }
            return new Promise(function (resolve, reject) {
                for (var _i = 0, files_2 = files_1; _i < files_2.length; _i++) {
                    _this.fileInfo = files_2[_i];
                    _this.blobToBase64(_this.fileInfo).then(function (base64) {
                        if (base64) {
                            //   this.photoList.push(base64);
                            _this.photoList.push(base64);
                            console.log(_this.photoList);
                            //resolve(this.photoList);
                        }
                    }).catch(function (err) {
                        console.log(err);
                        reject();
                    });
                }
                // console.log(productInformation)
                if (_this.photoList.length > 0) {
                    _this.fileService.addProductCatalogToDb(form, _this.productSpecificsInfos, _this.productInformationDetailList, _this.photoList).then(function (result) {
                        _this.finalProductList.push(result);
                        _this.productInformationForm.reset();
                        _this.surveyForm.reset();
                        _this.productForm.reset();
                        _this.ionViewDidLoad();
                        resolve(_this.finalProductList);
                    }).catch(function (err) {
                        console.log('errr has occured' + err);
                    });
                }
                loading.dismiss();
            });
        }
    };
    ProductPage.prototype.productRemove = function (i) {
        if (i == 0) {
            this.finalProductList.splice(i);
        }
        else {
            this.finalProductList.splice(i, 1);
        }
    };
    ProductPage.prototype.showAlert = function () {
        this.errorAlert = this.alertCrtl.create({
            title: 'No File selected',
            message: this.noteMessage,
            buttons: [
                {
                    text: "Ok",
                    handler: function (data) {
                        console.log('Save Clicked');
                        return null;
                    }
                }
            ]
        });
        this.errorAlert.present();
    };
    ProductPage.prototype.blobToBase64 = function (blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onloadend = function () {
                //This will convert to base64 string
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        }).catch(function (err) {
            console.log(err);
        });
    };
    __decorate([
        ViewChild("input"),
        __metadata("design:type", ElementRef)
    ], ProductPage.prototype, "nativeInputBtn", void 0);
    ProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product',
            templateUrl: 'product.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController,
            ProductServiceProvider,
            AlertController, FormBuilder,
            SubCatagoryServiceProvider,
            CatalogServiceProvider,
            CatagoryServiceProvider, NavParams])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.js.map
