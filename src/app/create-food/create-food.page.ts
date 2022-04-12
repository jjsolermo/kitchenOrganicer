import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../share/food';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.page.html',
  styleUrls: ['./create-food.page.scss'],
})
export class CreateFoodPage implements OnInit {
  
  foodForm:FormGroup;
  food:Food;

  constructor(private router : Router,public toastController: ToastController) {
   }
  ngOnInit() {
    this.foodForm = new FormGroup({
      name: new FormControl(),
      descript:new FormControl(),
      qty:new FormControl(),
      expiration:new FormControl(),
      place:new FormControl(),
      buy:new FormControl(),
  });
 }

  back(){
    this.router.navigateByUrl('/menu',{ replaceUrl: true })
  }

   validate(){
    const datepipe: DatePipe = new DatePipe('en-US')
    if(this.foodForm.value.expiration && datepipe.transform(new Date(this.foodForm.value.expiration),'dd-MMM-YYYY') < datepipe.transform(new Date(),'dd-MMM-YYYY')){
       this.presentToast('La caducidad es menor al día de hoy.');
    }else if(this.foodForm.value.buy && datepipe.transform(new Date(this.foodForm.value.buy),'dd-MMM-YYYY') < datepipe.transform(new Date(),'dd-MMM-YYYY')){
      this.presentToast('La compra es menor al día de hoy.');
   }
    
    //f(this.foodForm.value);
  }

  async presentToast(msn:string) {
    const toast = await this.toastController.create({
      message: msn,
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

}
