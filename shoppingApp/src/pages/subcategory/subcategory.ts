import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {CatagoryServiceProvider} from "../../providers/catagory-service/catagory-service";
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";
import {SubCatagoryServiceProvider} from "../../providers/sub-catagory-service/sub-catagory-service";
import {AfoListObservable} from "angularfire2-offline";

/**
 * Generated class for the SubcategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  subCatagoryList: AfoListObservable<any[]>;
  catalogList: AfoListObservable<any[]>;

  subCatagoryId: string;
  subCatagoryDesc: string;
  catalogId: string;
  catagoryId: string;
  subCatagoryForm: any;
  private catagoryList: AfoListObservable<any[]>;
  private errorMessage: any;


  constructor(public navCtrl: NavController,public alertCrtl: AlertController, public fb: FormBuilder, public subCatagoryService: SubCatagoryServiceProvider, public catalogService: CatalogServiceProvider, public catagoryService: CatagoryServiceProvider, public navParams: NavParams) {
    this.subCatagoryForm = fb.group({
      'catalogId': ['', Validators.required],
      'catagoryId': ['', Validators.required],
      'subCatagoryId': ['', Validators.required],
      'subCatagoryDesc': ['', Validators.required]


    });

    this.catalogId = this.subCatagoryForm.controls['catalogId'];
    this.catagoryId = this.subCatagoryForm.controls['catagoryId'];
    this.subCatagoryId = this.subCatagoryForm.controls['subCatagoryId'];
    this.subCatagoryDesc = this.subCatagoryForm.controls['subCatagoryDesc'];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
    this.catalogList = this.catalogService.getCatalogServiceList();
    this.catagoryList = this.catagoryService.getCatagoryList();
    this.subCatagoryList = this.subCatagoryService.getSubCatagoryList();
  }

  subCatagorySubmit(form){
    console.log(form);
    this.subCatagoryService.saveSubCatagory(form).then( res =>{
      console.log(res);
      this.showAlert();
      this.subCatagoryForm.reset();
      this.ionViewDidLoad();

    }).catch((err) => {
      console.log("error while inserting the records" + err);
      this.showErrorAlert();
    });

  }

  private showAlert() {
    this.errorMessage = this.alertCrtl.create({
      title: "Sub Category Notification Alert",
      message: 'Item is stored to the Catagory',
      buttons: [{
        text: 'Okay',
        handler: () => {
          //this.navCtrl.push(HomePage);
          return null;
        }
      }]

    });
    this.errorMessage.present();
  }

  private showErrorAlert() {
    let alertErr = this.alertCrtl.create({
      title: "Sub Category Notification Alert",
      message: 'Item is already exists',
      buttons: [{
        text: 'Okay',
        handler: () => {
          return null;
        }
      }]
    });
    alertErr.present();
  }

}
