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
    this.foodService.getFoods().then((food)=>{
      food.forEach((item)=>{
        var food:Food = {
          uid: item.uid,
          name: item.name,
          description: item.description,
          qty: item.qty,
          caducity: item.caducity,
          buy: item.buy,
          place: item.place
        }
        this.foods.push(food);
      } )  
    });
  }
  //const q = query(collection(db, "cities"), where("capital", "==", true));
  openMenu(){
    //this.menuController.open()
  }

  AddFood(){
    this.router.navigateByUrl('/create-food', { replaceUrl: true });
  }

}
