import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";

/*
  Generated class for the ProductImageProcessingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductImageProcessingServiceProvider {
  files: AfoListObservable<any[]>;
  DB_NAME: any = '/productCatalog';

  //provided the construction injection for access the database offline

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
    console.log( 'Hello ProductImageProcessingService Provider' );
  }

  //Retrieving all the uploaded image files

  public getUploadedFile() {
    this.files = this.db.list( this.DB_NAME );
    return this.files;
  }

  //Saving the uploaded files to existing list and firebase db.
  public addFileServices(fileInfo: any) {
    //console.log(fileName);
    return new Promise( (resolve, reject) => {
      this.files = this.db.list( this.DB_NAME );

      //Created the ID for accessing the uploaded image files
      let gallaryPhtoto = {
        gallary: fileInfo
      };

      this.files.push( gallaryPhtoto );

      resolve( this.files );
      console.log( 'insert the file to the list' );

    } );

  }
}
