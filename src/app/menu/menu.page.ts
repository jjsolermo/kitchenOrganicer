import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menuController:MenuController,private router:Router,private foodService:FoodService) { }

  ngOnInit() {
    this.foodService.getFoods();
  }

  openMenu(){
    //this.menuController.open()
  }

  AddFood(){
    this.router.navigateByUrl('/create-food', { replaceUrl: true });
  }

}
