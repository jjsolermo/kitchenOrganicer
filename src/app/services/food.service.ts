import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { collection, collectionData, doc, docData, Firestore, getDocs, getFirestore, setDoc } from '@angular/fire/firestore';
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
    let foodList:Array<Food> = [];
    const querySnapshot = await getDocs(collection(this.firestore, "food"));
    querySnapshot.forEach((doc) => {
      var food:Food = {
        uid: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        qty: doc.data().qty,
        caducity: doc.data().caducity,
        buy: doc.data().buy,
        place: doc.data().place
      }
      foodList.push(food);
    });

    return foodList;
  }
  //const q = query(collection(db, "cities"), where("capital", "==", true));
  validateFood(foodForm:FormGroup){
    let food:Food;
    const datepipe: DatePipe = new DatePipe('en-US');
    let validateValue:boolean = true;
    if(foodForm.value.expiration && datepipe.transform(new Date(foodForm.value.expiration),'dd-MMM-YYYY') < datepipe.transform(new Date(),'dd-MMM-YYYY')){
       this.presentToast('La caducidad es menor al día de hoy.');
       validateValue = false;
    }
    if(foodForm.value.buy && datepipe.transform(new Date(foodForm.value.buy),'dd-MMM-YYYY') < datepipe.transform(new Date(),'dd-MMM-YYYY')){
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

}
