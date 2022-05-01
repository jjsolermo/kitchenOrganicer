import { Component, OnInit } from '@angular/core';
import { Food } from '../share/food';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {

  food:Food;
  name:string;
  constructor() { }

  ngOnInit() {
    console.log(this.food);
    this.name = this.food.name;
  }

}
