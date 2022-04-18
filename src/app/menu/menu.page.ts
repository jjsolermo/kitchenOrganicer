import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Food } from '../share/food';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  foodList:Promise<Array<Food>>;
  foods:Array<Food> = [];
  constructor(private menuController:MenuController,private router:Router,private foodService:FoodService) { }

  ngOnInit() {
    this.foodList = this.foodService.getFoods();
    this.foodList.then((food) => {
      console.log(fooo)
      food.map( food => food)
    })
  }

  openMenu(){
    //this.menuController.open()
  }

  AddFood(){
    this.router.navigateByUrl('/create-food', { replaceUrl: true });
  }

}
