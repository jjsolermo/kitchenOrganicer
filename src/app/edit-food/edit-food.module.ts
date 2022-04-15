import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFoodPageRoutingModule } from './edit-food-routing.module';

import { EditFoodPage } from './edit-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFoodPageRoutingModule
  ],
  declarations: [EditFoodPage]
})
export class EditFoodPageModule {}
