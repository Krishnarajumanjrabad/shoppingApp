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
import {AngularFireAuth} from "angularfire2/auth";
import {AlertController} from "ionic-angular";
import 'rxjs/add/operator/map';
import {EmailServiceProvider} from "../email-service/email-service";
/*
  Generated class for the AuthenicateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthenicateServiceProvider = /** @class */ (function () {
    /// errorAlert: Alert;
    //private userList: FirebaseListObservable<any[]>;
    // private user: any;
    //private recordFound: boolean = false;
    function AuthenicateServiceProvider(http, db, afireauth, alertCrt, email) {
        this.http = http;
        this.db = db;
        this.afireauth = afireauth;
        this.alertCrt = alertCrt;
        this.email = email;
        this.userFound = false;
    }
    AuthenicateServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        console.log(credentials);
        return new Promise(function (resolve, reject) {
            _this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(function (res) {
                console.log(res);
                _this.userInfo = _this.db.list("/users");
                _this.userInfo.subscribe(function (result) {
                    //  console.log( "user info" + result );
                    result.forEach(function (user) {
                        if (user.email == credentials.email) {
                            console.log("user is found");
                            // console.log( user );
                            resolve(user);
                            return user;
                        }
                    });
                });
                return;
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AuthenicateServiceProvider.prototype.passwordreset = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afireauth.auth.sendPasswordResetEmail(email).then(function (res) {
                console.log(res);
                resolve(res);
                return;
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AuthenicateServiceProvider.prototype.adduser = function (newuser) {
        var _this = this;
        console.log(newuser);
        return new Promise(function (resolve, reject) {
            _this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(function (newUser) {
                _this.userInfo = _this.db.list("/users");
                if (_this.userInfo.isEmpty()) {
                    _this.userInfo.push(newuser);
                    _this.email.sendRegisterationEmail(newuser).then(function (response) {
                        console.log(response);
                        if (response != null) {
                            resolve(_this.userInfo);
                            return;
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
                else {
                    _this.userInfo.subscribe(function (res) {
                        console.log("user info" + res);
                        res.forEach(function (user) {
                            if (user.email == newUser.email) {
                                _this.userFound = true;
                                console.log("user is already exist");
                            }
                        });
                        if (!_this.userFound) {
                            _this.userInfo.push(newuser);
                            _this.email.sendRegisterationEmail(newuser).then(function (response) {
                                console.log(response);
                                if (response != null) {
                                    resolve(_this.userInfo);
                                    return;
                                }
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    });
                }
            });
            return;
        });
    };
    AuthenicateServiceProvider.prototype.logOut = function () {
        this.afireauth.auth.signOut();
    };
    AuthenicateServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireOfflineDatabase, AngularFireAuth, AlertController, EmailServiceProvider])
    ], AuthenicateServiceProvider);
    return AuthenicateServiceProvider;
}());
export { AuthenicateServiceProvider };
//# sourceMappingURL=authenicate-service.js.map
