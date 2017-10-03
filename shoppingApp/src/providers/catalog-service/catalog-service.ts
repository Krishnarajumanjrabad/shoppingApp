import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";


/*
  Generated class for the CatalogServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CatalogServiceProvider {
  confirmMatchFound: boolean = false;
  private cataLogList: AfoListObservable<any[]>;
  private matchExist: boolean = false;

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log('Hello CatalogServiceProvider Provider');
  }

  getCatalogServiceList() {
    this.cataLogList = this.db.list("/catalog", {
      query: {
        orderByChild: "catalogId"
      }
    });
    return this.cataLogList;
  }

  addCatalog(form): any {
    if (form) {

      this.cataLogList = this.db.list("/catalog", {
        query: {
          orderByChild: "catalogId"
        }
      });
      return new Promise((resolve, reject) => {


        this.cataLogList.subscribe(result => {


          console.log(result);
          if (result.length > 0) {

            this.matchExist = this.confirmMatchExist(result, form);
            console.log(this.matchExist);


          } else {
            console.log("this is first time record is inserted in to DB");
            resolve(this.cataLogList.push(form));

          }


        });

        if (!this.matchExist) {
          //this.cataLogList.push(form);
          resolve(this.cataLogList.push(form));

        } else {
          reject();
        }
      });
    }
  }


  deleteCatalogItem(item) {
    if (item)
      this.cataLogList.remove(item);

  }


  private confirmMatchExist(result, form): any {
    this.matchExist = false;


    for (let item of result) {


      if (form.catalogId === item.catalogId) {
        // console.log("same catalog id is found");
        this.matchExist = true;
        break;
      }

    }
    //console.log(this.matchExist);

    return this.matchExist;
  }


}
