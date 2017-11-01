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
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  ViewController
} from 'ionic-angular';
import {UserInformation} from "../../model/userInformation";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {SigninPage} from "../signin/signin";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, fb, auth, loadingCrt, alertCrt, popCrtl) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.auth = auth;
        this.loadingCrt = loadingCrt;
        this.alertCrt = alertCrt;
        this.popCrtl = popCrtl;
        this.email = "";
        this.password = "";
        this.errorMessage = "Invalid username or password";
        this.userInfo = null;
        console.log('Hello Login Page');
        //  this.email = window.localStorage.getItem("username");
        if (this.email == null) {
            this.email = " ";
        }
        // this.password = window.localStorage.getItem("password");
        if (this.password == null) {
            this.password = " ";
        }
        this.loginForm = fb.group({
            'email': [' ', Validators.required],
            'password': [' ', Validators.required]
        });
        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }
    LoginPage.prototype.signIn = function () {
        console.log('button is clicked');
        this.navCtrl.push(SigninPage);
    };
    LoginPage.prototype.reset = function (form) {
        form.reset();
    };
    LoginPage.prototype.login = function (form) {
        var _this = this;
        var userInfos = null;
        this.userInfo = null;
        console.log('it is inside the onsubmit' + form);
        if (form) {
            console.log('inside the login submission');
            return new Promise(function (resolve) {
                _this.auth.login(form).then(function (res) {
                    if (res) {
                        userInfos = JSON.parse(JSON.stringify(res));
                        console.log(userInfos);
                        _this.userInfo = new UserInformation(userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact, userInfos.email, userInfos.userType);
                        console.log("logged in user information" + _this.userInfo);
                        //Flushing the existing user from the localstorage
                        window.localStorage.removeItem("user");
                        //creating new logged in user
                        window.localStorage.setItem("user", JSON.stringify(_this.userInfo));
                        resolve(_this.userInfo);
                        _this.navCtrl.popToRoot();
                    }
                    else {
                        _this.errorAlert = _this.alertCrt.create({
                            title: 'Login Failure Message',
                            message: _this.errorMessage,
                            buttons: [
                                {
                                    text: "Ok",
                                    handler: function (data) {
                                        console.log('Save Clicked');
                                    }
                                }
                            ]
                        });
                        _this.errorAlert.present();
                    }
                }).catch(function (error) {
                    console.log("inside the else loop");
                    _this.errorAlert = _this.alertCrt.create({
                        title: 'Login Failure Message',
                        message: _this.errorMessage,
                        buttons: [
                            {
                                text: "Ok",
                                handler: function (data) {
                                    console.log('Save Clicked');
                                }
                            }
                        ]
                    });
                    _this.errorAlert.present();
                });
            });
        }
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, AuthenicateServiceProvider, LoadingController, AlertController, ViewController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map
