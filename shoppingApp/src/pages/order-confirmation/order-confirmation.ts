import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {HomePage} from "../home/home";
import {EmailServiceProvider} from "../../providers/email-service/email-service";

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
  orderInfoDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireOfflineDatabase, public emailService: EmailServiceProvider) {

    if (navParams.get("orderInfo") != null){
      this.orderInfoDetails = navParams.get("orderInfo");
      console.log(this.orderInfoDetails);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationPage');
  }

  goToHome(){
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot("HomePage");
  }


  makeOnlinePayment(){

    //payment needs to be integrated
    if(this.orderInfoDetails){
      console.log("calling the email service");
      this.emailService.sendOrderConfirmationEmail(this.orderInfoDetails).then( (res) =>{
        console.log(res);
        console.log("order confirmation email is sent to ordered user");
      }).catch(err =>{
        console.log(err);
      })
    }


    console.log("payment method is invoked");
  }


}
