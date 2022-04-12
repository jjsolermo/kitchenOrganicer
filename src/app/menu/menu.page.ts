import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menuController:MenuController,private router:Router) { }

  ngOnInit() {
  }

  openMenu(){
    //this.menuController.open()
  }

  AddFood(){
    this.router.navigateByUrl('/create-food', { replaceUrl: true });
  }

}
