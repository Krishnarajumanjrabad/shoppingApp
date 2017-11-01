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
import {AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EmailServiceProvider} from "../../providers/email-service/email-service";

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderConfirmationPage = /** @class */ (function () {
    function OrderConfirmationPage(navCtrl, navParams, db, emailService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.emailService = emailService;
        if (navParams.get("orderInfo") != null) {
            this.orderInfoDetails = navParams.get("orderInfo");
            console.log(this.orderInfoDetails);
        }
    }
    OrderConfirmationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderConfirmationPage');
    };
    OrderConfirmationPage.prototype.goToHome = function () {
        this.navCtrl.popToRoot();
        this.navCtrl.setRoot("HomePage");
    };
    OrderConfirmationPage.prototype.makeOnlinePayment = function () {
        //payment needs to be integrated
        if (this.orderInfoDetails) {
            console.log("calling the email service");
            this.emailService.sendOrderConfirmationEmail(this.orderInfoDetails).then(function (res) {
                console.log(res);
                console.log("order confirmation email is sent to ordered user");
            }).catch(function (err) {
                console.log(err);
            });
        }
        console.log("payment method is invoked");
    };
    OrderConfirmationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-order-confirmation',
            templateUrl: 'order-confirmation.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireOfflineDatabase, EmailServiceProvider])
    ], OrderConfirmationPage);
    return OrderConfirmationPage;
}());
export { OrderConfirmationPage };
//# sourceMappingURL=order-confirmation.js.map
