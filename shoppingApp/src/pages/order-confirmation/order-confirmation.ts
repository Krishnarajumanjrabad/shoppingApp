import { AfoListObservable, AngularFireOfflineDatabase } from "angularfire2-offline";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenicateServiceProvider } from "../../providers/authenicate-service/authenicate-service";
import { Component } from '@angular/core';
import { EmailServiceProvider } from "../../providers/email-service/email-service";
import { HomePage } from "../home/home";
import { UserInformation } from "../../model/userInformation";
import {LoginPage} from "../../pages/login/login";

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  orderInfoList: AfoListObservable<any[]>;
  orderInfoDetails: any;
  userInfo: UserInformation;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireOfflineDatabase,
    public auth: AuthenicateServiceProvider, public emailService: EmailServiceProvider) {

    if (navParams.get("orderInfo") != null) {
      this.orderInfoDetails = navParams.get("orderInfo");
      console.log(this.orderInfoDetails);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationPage');
  }

  goToHome() {
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot(HomePage);
  }


  makeOnlinePayment() {

    //payment needs to be integrated
    if (this.orderInfoDetails) {
      console.log("calling the email service");
      this.emailService.sendOrderConfirmationEmail(this.orderInfoDetails).then((res) => {
        console.log(res);
        console.log("order confirmation email is sent to ordered user");
      }).catch(err => {
        console.log(err);
      })
    }


    console.log("payment method is invoked");
  }

  logOff() {
    console.log('inside the log off functionality');
    this.auth.logOut();
    window.localStorage.removeItem("user");
    this.userInfo = new UserInformation("", "", "", "", 0, "", "", 0, "", "");
    this.navCtrl.setRoot(LoginPage).then(() =>{
      this.navCtrl.popToRoot();
    });
  }

}
