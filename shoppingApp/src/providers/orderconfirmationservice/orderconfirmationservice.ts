import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";

/*
  Generated class for the OrderconfirmationserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrderconfirmationserviceProvider {
  public orderDetailsList: AfoListObservable<any[]>;

  public orderInformation: any;

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {

    console.log( 'Hello OrderconfirmationserviceProvider Provider' );

  }

  getOrderDetais(){
      this.orderDetailsList = this.db.list('/order');
      return this.orderDetailsList;

  }

  saveOrderDetails(orderForm, productList, grandTotalPrice, orderId, userInfo) {
    return new Promise( resolve => {
      this.orderDetailsList = this.db.list( '/order' );
      if(userInfo &&  userInfo != "undefined" && userInfo != null){
        this.orderInformation = {
          "orderid": orderId,
          "orderDetail": orderForm.value,
          "productList": productList,
          "totalAmount": grandTotalPrice,
          "user": userInfo
        };
      } else {
        this.orderInformation = {
          "orderid": orderId,
          "orderDetail": orderForm.value,
          "productList": productList,
          "totalAmount": grandTotalPrice
        };
      }

      this.orderDetailsList.push( this.orderInformation );
      resolve( this.orderInformation );


      return;
    } );
  }

}
