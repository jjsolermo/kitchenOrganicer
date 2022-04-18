import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { collection, collectionData, doc, docData, Firestore, getDocs, getFirestore, query, setDoc, where } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { map } from '@firebase/util';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Food } from '../share/food';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FoodService {

   datepipe: DatePipe = new DatePipe('en-US');
  constructor(private firestore:Firestore,public toastController: ToastController) {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
   }

  createFood(food: Food): Promise<void> {
    const document = doc(collection(this.firestore, 'food'));
    return setDoc(document, food);
   }

   async presentToast(msn:string) {
    const toast = await this.toastController.create({
      message: msn,
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

   async getFoods() : Promise<Food[]>{   
    var d =  this.sumarDias(new Date(),3);
    let foodList:Array<Food> = [];
    const querySnapshot = await getDocs(query(collection(this.firestore, "food"),where('expiration', '<=', d)));
    querySnapshot.forEach((doc) => {
      var food:Food = {
        uid: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        qty: doc.data().qty,
        expiration: doc.data().expiration,
        buy: doc.data().buy,
        place: doc.data().place
      }
      foodList.push(food);
    });
    console.log(foodList)
    return foodList;
  }


  validateFood(foodForm:FormGroup){
   
    let food:Food;
    let validateValue:boolean = true;
    if(foodForm.value.expiration && this.datepipe.transform(new Date(foodForm.value.expiration),'dd-MMM-YYYY') < this.datepipe.transform(new Date(),'dd-MMM-YYYY')){
       this.presentToast('La caducidad es menor al día de hoy.');
       validateValue = false;
    }
    if(foodForm.value.buy && this.datepipe.transform(new Date(foodForm.value.buy),'dd-MMM-YYYY') < this.datepipe.transform(new Date(),'dd-MMM-YYYY')){
      this.presentToast('La compra es menor al día de hoy.');
      validateValue = false;
   }
   if(foodForm.value.qty <= 0){
     this.presentToast('La cantidad no puede ser 0 o inferior');
     validateValue = false;
   }
   if(foodForm.value.name === undefined || foodForm.value.name === ''){
     this.presentToast('El campo nombre no puede estar vacio');
     validateValue = false;
   }
   if(validateValue){
    for (let clave in foodForm.value){
      if(foodForm.value[clave]===undefined){
        foodForm.value[clave] = ''
      }
    }
    food = foodForm.value;
    return food;
   } 
   
  }

  /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
  sumarDias(fecha, dias){
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

}
