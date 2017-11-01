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
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SigninPage = /** @class */ (function () {
    function SigninPage(navCtrl, fb, navParams, auth, alert) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.navParams = navParams;
        this.auth = auth;
        this.alert = alert;
        this.userType = "regular";
        this.errorMessage = "User is already Exist in the system";
        this.signUpMessage = "Registration is complete to Activate, please follow the registered email";
        this.signupForm = fb.group({
            'password': ['', [Validators.required, Validators.minLength(8)]],
            'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
            'fname': ['', Validators.required],
            'mname': [''],
            'lname': ['', Validators.required],
            'address': ['', Validators.required],
            'contactNumber': ['', Validators.required],
            'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            "userType": ['']
        });
        this.password = this.signupForm.controls['password'];
        this.fname = this.signupForm.controls['fname'];
        this.mname = this.signupForm.controls['mname'];
        this.lname = this.signupForm.controls['lname'];
        this.confirmPassword = this.signupForm.controls['confirmPassword'];
        this.address = this.signupForm.controls['address'];
        this.contactNumber = this.signupForm.controls['contactNumber'];
        this.email = this.signupForm.controls['email'];
        this.userType = this.signupForm.controls['userType'];
    }
    SigninPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SigninPage');
    };
    SigninPage.prototype.checkConfirmPasswordValidator = function (password, confirmPassword) {
        if (password != null && confirmPassword != null) {
            if (JSON.stringify(password) == JSON.stringify(confirmPassword)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    SigninPage.prototype.login = function (formValue) {
    };
    SigninPage.prototype.signUp = function (formValue) {
        var _this = this;
        console.log('inside the signup method');
        if (formValue)
            this.auth.adduser(formValue).then(function (result) {
                console.log("sign in results");
                console.log(result);
                _this.showAlert();
                _this.navCtrl.setRoot("HomePage", result).then(function (data) {
                    _this.navCtrl.popToRoot();
                });
            });
    };
    SigninPage.prototype.showAlert = function () {
        this.errorAlert = this.alert.create({
            title: 'New User is created to RashiEWaste',
            message: 'Thank You for the registration to RashiEWaste',
            buttons: [
                {
                    text: "Ok",
                    handler: function (data) {
                        console.log('Save Clicked');
                    }
                }
            ]
        });
        this.errorAlert.present();
    };
    SigninPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signin',
            templateUrl: 'signin.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, AuthenicateServiceProvider, AlertController])
    ], SigninPage);
    return SigninPage;
}());
export { SigninPage };
//# sourceMappingURL=signin.js.map
