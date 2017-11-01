import {Injectable, NgZone} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the EmailServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EmailServiceProvider {
  public transport: any;

  constructor(public http: Http, public zone: NgZone) {
    console.log( 'Hello EmailServiceProvider Provider' );

  }

  sendRegisterationEmail(newUser) {
    console.log( newUser.email );

    let subject = "Registration with Ayur Ashra";
    let html = " <html> <body><h1>Registration with Ayur Ashram was successful</h1>" + newUser.email +
      "<p> Thank you for joining hands with Ayur and we will provide the service to our level best and you will recieve all the latest updates with Ayur medicine</p></h1></body></html>";
  
    var headings = new Headers();
    headings.append( 'Content-Type', 'application/x-www-form-urlencoded' );


    let body = 'to=' + newUser.email + '&subject=' + subject + '&html=' + html;
    // let body = JSON.stringify({ to: reciptent, text: message, subject: subject });
    console.log( body );
    let hostURL = "http://localhost:3000/send";
    let options = new RequestOptions( {headers: headings, method: "post", body: body} );


    // let options = new RequestOptions({ headers: headings });
    return new Promise( resolve => {
      this.zone = new NgZone( {enableLongStackTrace: false} );

     return this.http.post( hostURL, body, options ).subscribe( response => {
        console.log( response );
        console.log( response.ok );
        console.log( 'send email is Complete' );
        resolve( response );

      } );
    } );


  }

  sendOrderConfirmationEmail(orderInformation) {


    if (orderInformation) {
      let subject = "Your Purchased  Order information is " + orderInformation.orderid;
      let html = "<html>" +
        "<body> <p> <h2 text-wrap justify-content-center> Thank you for ordering the Ayush Asharam product, please find the ordered product information as follows: </h2></p>" +
        "Order Id is: <strong>" + orderInformation.orderid + "</strong>\n" +
        " Please visit again for shopping with Ayush products, You can track your orders in the Order History Menu in the app" +

        "</body></html>"


      var headings = new Headers();
      headings.append( 'Content-Type', 'application/x-www-form-urlencoded' );


      let body = 'to=' + orderInformation.orderDetail.customerInfo.email + '&subject=' + subject + '&html=' + html;
      // let body = JSON.stringify({ to: reciptent, text: message, subject: subject });
      console.log( body );
      //let hostURL =
      // "https://us-central1-ayushaurshopping-17a68.cloudfunctions.net/sendEmail/send";
      let hostURL = "http://localhost:3000/send";
      let options = new RequestOptions( {headers: headings, method: "post", body: body} );


      // let options = new RequestOptions({ headers: headings });
      return new Promise( resolve => {
        this.zone = new NgZone( {enableLongStackTrace: false} );
        return this.http.post( hostURL, body, options ).subscribe( response => {
          console.log( response );
          console.log( response.ok );
          console.log( 'send email is Complete' );
          resolve( response );

        } );
      } );
    }
  }

}
