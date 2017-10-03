import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {FirebaseListFactoryOpts} from "angularfire2-offline/database/angularfire2-interfaces";

/*
  Generated class for the CatagoryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CatagoryServiceProvider {
  catagoryList: AfoListObservable<any[]>;
  private matchExist: boolean = false;

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log('Hello CatagoryServiceProvider Provider');

  }

  saveCatagory(form: any) {
    return new Promise((resolve, reject) => {

      if(form){
        this.catagoryList = this.db.list("/catagory", {
          query: {
            orderByChild: "çatagoryId"
          }
        });

        this.catagoryList.subscribe( result => {
          console.log(result);
          if(result.length > 0){
            for(let item of result){
              if(item.catagoryId === form.catagoryId){
                this.matchExist = true;
                break;
              }
            }
          } else {
            console.log("this is first case of catagory entry to db");
            this.catagoryList.push(form);
          }

        });
      }

      if (!this.matchExist) {
        //this.cataLogList.push(form);
        resolve(this.catagoryList.push(form));

      } else {
        reject();
      }
    });

  }

  getCatagoryList() {
    this.catagoryList = this.db.list("/catagory", {
      query: {
        orderByChild: 'çatagoryId'
      }
    });
    return this.catagoryList;
  }
}
