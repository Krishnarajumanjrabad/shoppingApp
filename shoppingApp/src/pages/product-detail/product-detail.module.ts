import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProductDetailPage} from './product-detail';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule( {
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild( ProductDetailPage ),
    Ionic2RatingModule
  ],
} )
export class ProductDetailPageModule {
}
