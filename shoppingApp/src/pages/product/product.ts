import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {CatagoryServiceProvider} from "../../providers/catagory-service/catagory-service";
import {CatalogServiceProvider} from "../../providers/catalog-service/catalog-service";
import {SubCatagoryServiceProvider} from "../../providers/sub-catagory-service/sub-catagory-service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AfoListObservable} from "angularfire2-offline";
import {ProductSpecificsInfo} from "../../model/productSpecificsInfo";
import {ProductServiceProvider} from "../../providers/product-service/product-service";

/*
class ProductSpecificsInfoSpecific {
  unit: string = "";
  compositionType: string = "";
  price: number = 0;
  skuStock: number = 0;
}*/

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-product',
  templateUrl: 'product.html',
} )
export class ProductPage {
  finalProductsList: Promise<any> | AfoListObservable<any[]>;
  photoList: any[] = [];
  finalProductList: any[] = [];
  //ProductImageProcessing
  public photos: Promise<any> | AfoListObservable<any[]>;
  subCatagoryList: AfoListObservable<any[]>;
  catagoryList: AfoListObservable<any[]>;
  catalogList: AfoListObservable<any[]>;
  productForm: FormGroup;
  surveyForm: FormGroup;
  productInformationForm: FormGroup;
  catalogId: string | AbstractControl;
  catagoryId: string | AbstractControl;
  subCatagoryId: string | AbstractControl;
  productId: string | AbstractControl;
  productDesc: string | AbstractControl;
  productType: string | AbstractControl;
  productTypes: any[] = [
    "Cream", "Tablets", "Capsules", "Tonics", "Oil", "Syrups", "Asavas", "Aristas", "Lehas", "Pakas Malt", "Ointments", "Medicainal Set"
  ];
  unit: any;
  productCompositions: any[] = ["ml", "g", "kg", "sheet", "numbers", "SET"];
  compositionType: AbstractControl;
  price: AbstractControl;
  skuStock: AbstractControl;
  productSpecificsInfos: ProductSpecificsInfo[] = [];
  qty: AbstractControl;
  ingredients: AbstractControl;
  direction: AbstractControl;
  @ViewChild( "input" )
  private nativeInputBtn: ElementRef;
  private fileInfo: any;
  private noteMessage: any = "Please select the file";
  private errorAlert: any;
  private productInformationDetailList: any[] = [];
  private productcompositionType: AbstractControl;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public fileService: ProductServiceProvider,
              public alertCrtl: AlertController, public fb: FormBuilder,
              public subCatagoryService: SubCatagoryServiceProvider,
              public catalogService: CatalogServiceProvider,
              public catagoryService: CatagoryServiceProvider, public navParams: NavParams) {
    this.productForm = fb.group( {
      'catalogId': ['', Validators.required],
      'catagoryId': [''],
      'subCatagoryId': [''],
      'productId': ['', Validators.required],
      'productDesc': ['', Validators.required],
      'productType': ['', Validators.required],
      'direction': ['', Validators.required]

    } );

    this.catalogId = this.productForm.controls['catalogId'];
    this.catagoryId = this.productForm.controls['catagoryId'];
    this.subCatagoryId = this.productForm.controls['subCatagoryId'];
    this.productId = this.productForm.controls['productId'];
    this.productDesc = this.productForm.controls['productDesc'];
    this.productType = this.productForm.controls['productType'];
    this.direction = this.productForm.controls['direction'];


    this.surveyForm = fb.group( {
        'unit': ['', Validators.required],
        'compositionType': ['', Validators.required],
        'price': ['', Validators.required],
        'skuStock': ['', Validators.required]
      }
    );
    this.unit = this.surveyForm.controls['unit'];
    this.compositionType = this.surveyForm.controls['compositionType'];
    this.price = this.surveyForm.controls['price'];
    this.skuStock = this.surveyForm.controls['skuStock'];


    this.productInformationForm = fb.group( {
      'ingredients': ['', Validators.required],
      'productcompositionType': ['', Validators.required],
      'qty': ['', Validators.required]
    } );
    this.ingredients = this.productInformationForm.controls['ingredients'];
    this.productcompositionType = this.productInformationForm.controls['productcompositionType'];
    this.qty = this.productInformationForm.controls['qty'];
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ProductPage' );
    this.catalogList = this.catalogService.getCatalogServiceList();
    this.catagoryList = this.catagoryService.getCatagoryList();
    this.subCatagoryList = this.subCatagoryService.getSubCatagoryList();
    this.finalProductsList = this.fileService.getProductCatalogList();

  }

  addItemToProductSpecificInfos(item) {

    if (item) {
      this.productSpecificsInfos.push( item );

    }
    this.surveyForm.reset();
    return this.productSpecificsInfos;
  }

  removeItem(i) {

    if (i == 0) {
      this.productSpecificsInfos.splice( i );
    } else {
      this.productSpecificsInfos.splice( i, 1 );
    }
    return this.productSpecificsInfos;
  }

  addItemToProductInformationDetails(item) {
    if (item) {
      this.productInformationDetailList.push( item );
    }
    this.productInformationForm.reset();
    return this.productInformationDetailList;
  }


  productSubmit(form) {
    let loading = this.loadingCtrl.create( {
      content: 'Please wait content is saving...'
    } );
    loading.present();

    //console.log(form);
    if (form) {
      let files = this.nativeInputBtn.nativeElement.files;


      //Check whether file is browsed while clicking the upload button
      if (files.length == 0) {
        this.showAlert();
        return null;
      }


      return new Promise( (resolve, reject) => {
        for (this.fileInfo of files) {

          this.blobToBase64( this.fileInfo ).then( (base64) => {
            if (base64) {
              //   this.photoList.push(base64);
              this.photoList.push( base64 );
              console.log( this.photoList );
              //resolve(this.photoList);
            }


          } ).catch( (err) => {
            console.log( err );
            reject();
          } );

        }


        // console.log(productInformation)
        if (this.photoList.length > 0) {
          this.fileService.addProductCatalogToDb( form, this.productSpecificsInfos, this.productInformationDetailList, this.photoList ).then( result => {


            this.finalProductList.push( result );
            this.productInformationForm.reset();
            this.surveyForm.reset();
            this.productForm.reset();

            this.ionViewDidLoad();

            resolve( this.finalProductList );
          } ).catch( err => {
            console.log( 'errr has occured' + err );
          } );
        }

        loading.dismiss();
      } );

    }
  }

  productRemove(i) {

    if (i == 0) {
      this.finalProductList.splice( i );
    } else {
      this.finalProductList.splice( i, 1 );
    }
  }



  public showAlert() {
    this.errorAlert = this.alertCrtl.create( {
      title: 'No File selected',
      message: this.noteMessage,
      buttons: [
        {
          text: "Ok",
          handler: data => {
            console.log( 'Save Clicked' );

            return null;
          }

        }
      ]
    } );
    this.errorAlert.present();
  }

  public blobToBase64(blob) {
    return new Promise( (resolve) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        //This will convert to base64 string
        resolve( reader.result );
      };
      reader.readAsDataURL( blob );

    } ).catch( (err) => {
      console.log( err );
    } );

  }


}
