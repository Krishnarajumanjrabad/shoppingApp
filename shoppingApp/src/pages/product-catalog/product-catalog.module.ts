import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProductCatalogPage} from './product-catalog';

@NgModule( {
  declarations: [
    ProductCatalogPage,
  ],
  imports: [
    IonicPageModule.forChild( ProductCatalogPage ),
  ],
} )
export class ProductCatalogPageModule {
}
