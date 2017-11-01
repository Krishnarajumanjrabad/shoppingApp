var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Injectable, NgZone} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the EmailServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var EmailServiceProvider = /** @class */ (function () {
    function EmailServiceProvider(http, zone) {
        this.http = http;
        this.zone = zone;
        console.log('Hello EmailServiceProvider Provider');
    }
    EmailServiceProvider.prototype.sendRegisterationEmail = function (newUser) {
        var _this = this;
        console.log(newUser.email);
        var subject = "Registration with Ayur Ashra";
        var html = " <html> <body><h1>Registration with Ayur Ashram was successful</h1>" + newUser.email +
            "<p> Thank you for joining hands with Ayur and we will provide the service to our level best and you will recieve all the latest updates with Ayur medicine</p></h1></body></html>";
        var headings = new Headers();
        headings.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = 'to=' + newUser.email + '&subject=' + subject + '&html=' + html;
        // let body = JSON.stringify({ to: reciptent, text: message, subject: subject });
        console.log(body);
        var hostURL = "http://localhost:3000/send";
        var options = new RequestOptions({ headers: headings, method: "post", body: body });
        // let options = new RequestOptions({ headers: headings });
        return new Promise(function (resolve) {
            _this.zone = new NgZone({ enableLongStackTrace: false });
            return _this.http.post(hostURL, body, options).subscribe(function (response) {
                console.log(response);
                console.log(response.ok);
                console.log('send email is Complete');
                resolve(response);
            });
        });
    };
    EmailServiceProvider.prototype.sendOrderConfirmationEmail = function (orderInformation) {
        var _this = this;
        if (orderInformation) {
            var subject = "Your Purchased  Order information is " + orderInformation.orderid;
            var html = "<html>" +
                "<body> <p> <h2 text-wrap justify-content-center> Thank you for ordering the Ayush Asharam product, please find the ordered product information as follows: </h2></p>" +
                "Order Id is: <strong>" + orderInformation.orderid + "</strong>\n" +
                " Please visit again for shopping with Ayush products, You can track your orders in the Order History Menu in the app" +
                "</body></html>";
            var headings = new Headers();
            headings.append('Content-Type', 'application/x-www-form-urlencoded');
            var body_1 = 'to=' + orderInformation.orderDetail.customerInfo.email + '&subject=' + subject + '&html=' + html;
            // let body = JSON.stringify({ to: reciptent, text: message, subject: subject });
            console.log(body_1);
            //let hostURL =
            // "https://us-central1-ayushaurshopping-17a68.cloudfunctions.net/sendEmail/send";
            var hostURL_1 = "http://localhost:3000/send";
            var options_1 = new RequestOptions({ headers: headings, method: "post", body: body_1 });
            // let options = new RequestOptions({ headers: headings });
            return new Promise(function (resolve) {
                _this.zone = new NgZone({ enableLongStackTrace: false });
                return _this.http.post(hostURL_1, body_1, options_1).subscribe(function (response) {
                    console.log(response);
                    console.log(response.ok);
                    console.log('send email is Complete');
                    resolve(response);
                });
            });
        }
    };
    EmailServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, NgZone])
    ], EmailServiceProvider);
    return EmailServiceProvider;
}());
export { EmailServiceProvider };
//# sourceMappingURL=email-service.js.map
