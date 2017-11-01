import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";

/*
  Generated class for the SubCatagoryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SubCatagoryServiceProvider {
  matchExist: boolean = false;
  private subCatagoryList: AfoListObservable<any[]>;

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log( 'Hello SubCatagoryServiceProvider Provider' );
  }

  getSubCatagoryList() {
    this.subCatagoryList = this.db.list( '/subCatagory', {
      query: {
        orderByChild: 'subCatagoryId'
      }
    } );
    return this.subCatagoryList;
  }

  saveSubCatagory(form: any) {
    return new Promise( (resolve, reject) => {

      if (form) {
        this.subCatagoryList = this.db.list( "/subCatagory", {
          query: {
            orderByChild: "subCatagoryId"
          }
        } );

        this.subCatagoryList.subscribe( result => {
          console.log( result );
          if (result.length > 0) {
            for (let item of result) {
              if (item.subCatagoryId === form.subCatagoryId) {
                this.matchExist = true;
                break;
              }
            }
          } else {
            console.log( "this is first case of catagory entry to db" );
            this.subCatagoryList.push( form );
          }

        } );
      }

      if (!this.matchExist) {
        //this.cataLogList.push(form);
        resolve( this.subCatagoryList.push( form ) );

      } else {
        reject();
      }
    } );

  }
}
