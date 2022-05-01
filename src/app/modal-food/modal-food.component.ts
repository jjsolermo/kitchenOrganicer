import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodService } from '../services/food.service';
import { Food } from '../share/food';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {

  food:Food;
  name:string;
  constructor(private foodService: FoodService,private modalCtr: ModalController,) { }

  ngOnInit() {
    this.name = this.food.name;
  }


 async deleteFood (food:Food) {
   this.foodService.deleteFood(food);
   const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
 }
  

}
