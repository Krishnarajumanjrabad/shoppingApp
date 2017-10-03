import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcategoryPage } from './subcategory';

@NgModule({
  declarations: [
    SubcategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SubcategoryPage),
  ],
})
export class SubcategoryPageModule {}
