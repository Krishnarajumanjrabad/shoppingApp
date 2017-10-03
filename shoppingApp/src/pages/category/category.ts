import {Component} from '@angular/core';
import {Alert, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";
import {AfoListObservable} from "angularfire2-offline";
import {FormBuilder, Validators} from "@angular/forms";
import {CatagoryServiceProvider} from "../../providers/catagory-service/catagory-service";

/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  errorMessage: Alert;
  catagoryList: any;
  catalogList: AfoListObservable<any[]>;

  catagoryDesc: string;
  catagoryId: string;
  catalogId: string;

  catagoryForm: any;

  constructor(public navCtrl: NavController,public alertCrtl: AlertController,public fb:FormBuilder, public catagoryService: CatagoryServiceProvider, public navParams: NavParams, public catalogService: CatalogServiceProvider) {
    this.catagoryForm = fb.group({
      'catagoryId': ['', Validators.required],
      'catagoryDesc': ['', Validators.required],
      'catalogId': ['', Validators.required]
    });


    this.catagoryId = this.catagoryForm.controls['catagoryId'];
    this.catagoryDesc = this.catagoryForm.controls['catagoryDesc'];
    this.catalogId = this.catagoryForm.controls['catalogId'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    this.catalogList  = this.catalogService.getCatalogServiceList();
    this.catagoryList = this.catagoryService.getCatagoryList();
  }

  catagorySubmit(form){
    console.log(form);
    this.catagoryService.saveCatagory(form).then( res =>{
      console.log(res);
      this.showAlert();
      this.catagoryForm.reset();
      this.ionViewDidLoad();

    }).catch((err) => {
      console.log("error while inserting the records" + err);
      this.showErrorAlert();
    });

  }

  private showAlert() {
    this.errorMessage = this.alertCrtl.create({
      title: "Catagory Notification Alert",
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
      title: "Catagory Notification Alert",
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
