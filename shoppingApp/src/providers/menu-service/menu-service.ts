import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MenuServiceProvider {
  menuList: AfoListObservable<any[]>;


  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log('Hello MenuServiceProvider Provider');
  }

  getMenuInfo(){
    this.menuList = this.db.list('/Menu');
    console.log(this.menuList);
    return this.menuList;

  }

}
