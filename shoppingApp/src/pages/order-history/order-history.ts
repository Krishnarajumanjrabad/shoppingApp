import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {UserInformation} from "../../model/userInformation";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {HomePage} from "../home/home";


/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  orderInfoList: AfoListObservable<any[]>;
  orderInfoDetails:any;
  userInfo: UserInformation;
  filteredList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireOfflineDatabase,
              public auth: AuthenicateServiceProvider ) {
    if (window.localStorage.getItem( "user" ) != null) {
      let userInfos = JSON.parse( window.localStorage.getItem( "user" ) );
      //console.log(userInfos);
      this.userInfo = new UserInformation( userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact,userInfos.email, userInfos.userType );
      console.log( this.userInfo );
    }


    this.orderInfoList = this.db.list("/order",{ query:{
      orderByChild: "orderid",
      limitToLast: 5

    }});
    this.orderInfoList.subscribe( results => {

      results.forEach(items => {
        console.log(items);
        if(items.user.email ==  this.userInfo.email){
          this.filteredList.push(items);
          console.log(this.filteredList);
        }
        /*items.forEach(item =>{
          if(item.userInfo.email == this.userInfo.email){
            this.filteredList.push(item);
          }
        });*/

      });


    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }


  getOrderedItems(event){

      let searchVal = event.target.value;

      if (searchVal && searchVal.trim() != "") {
        this.db.list( '/order',{ query:{
          orderByChild: "orderid",
          limitToLast: 5}} ).subscribe( result => {
          this.filteredList = result;
          this.checkForFilteredResults( this.filteredList, searchVal );
        } );
      }
  }

  private checkForFilteredResults(filteredList: any[], searchVal: number) {
    this.filteredList = this.filteredList.filter( results => {

      if(results.orderid == searchVal){
        return true;
      } else {
        return false;
      }
    } );
    return this.filteredList;
  }

  logOff() {
    console.log( 'inside the log off functionality' );
    this.auth.logOut();
    window.localStorage.removeItem( "user" );
    this.userInfo = new UserInformation( "", "", "", "", 0, "", "", 0,"","" );
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot( "HomePage" );
  }

}
