import {Component} from '@angular/core';
import {Alert, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";
import {AfoListObservable} from "angularfire2-offline";

/**
 * Generated class for the CatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
} )
export class CatalogPage {
  errorMessage: Alert;
  newCatalogList: any = Array();
  catalogList: AfoListObservable<any[]>;

  alreadyExist: boolean = false;
  catalogDesc: string;
  catalogId: string;

  catalogForm: any;

  constructor(public navCtrl: NavController, public alertCrtl: AlertController, public navParams: NavParams, public fb: FormBuilder, public catalogService: CatalogServiceProvider) {

    this.catalogForm = fb.group( {
      'catalogId': ['', Validators.required],
      'catalogDesc': ['', Validators.required]
    } );


    this.catalogId = this.catalogForm.controls['catalogId'];
    this.catalogDesc = this.catalogForm.controls['catalogDesc'];

  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad CatalogPage' );
    this.catalogList = this.catalogService.getCatalogServiceList();

  }

  cataLogSubmit(form) {
    console.log( " inside the form submission" );
    if (form) {
      this.catalogService.addCatalog( form ).then( result => {
        console.log( result );
        this.showAlert();
        this.catalogForm.reset();
        this.ionViewDidLoad();

      } ).catch( (err) => {
        console.log( "error while inserting the records" + err );
        this.showErrorAlert();
      } );

    }
  }

  catalogRemove(item) {
    console.log( "Printing the item: " + item );
    this.catalogService.deleteCatalogItem( item );

  }

  private showAlert() {
    this.errorMessage = this.alertCrtl.create( {
      title: "Catalog Notification Alert",
      message: 'Item is stored to the catalog',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //this.navCtrl.push(HomePage);
            return null;
          }
        }
      ]

    } );
    this.errorMessage.present();
  }

  private showErrorAlert() {
    let alertErr = this.alertCrtl.create( {
      title: "Catalog Notification Alert",
      message: 'Item is already exists',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            return null;
          }
        }
      ]
    } );
    alertErr.present();
  }
}
