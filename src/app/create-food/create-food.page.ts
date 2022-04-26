import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.page.html',
  styleUrls: ['./create-food.page.scss'],
})
export class CreateFoodPage implements OnInit {
  
  foodForm:FormGroup;

  constructor(private router : Router,public toastController: ToastController,private foodService:FoodService) {
   }
  ngOnInit() {
    this.foodForm = new FormGroup({
      name: new FormControl(Validators.required),
      descript:new FormControl(),
      qty:new FormControl(Validators.required),
      expiration:new FormControl(),
      place:new FormControl(Validators.required),
      buy:new FormControl(),
      price: new FormControl(),
  });
 }
  back(){
    this.router.navigateByUrl('/menu',{ replaceUrl: true })
  }

   validate(){
    let result =  this.foodService.createFood(this.foodService.validateFood(this.foodForm));
    if(result !== undefined){
      this.presentToast('Comida guardada');
      this.clearForm();
    }
   } 
   
   clearForm(){
     this.foodForm.reset();
   }

   cancel(){
    this.router.navigateByUrl('/menu',{ replaceUrl: true })
   }
  
  async presentToast(msn:string) {
    const toast = await this.toastController.create({
      message: msn,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

}
