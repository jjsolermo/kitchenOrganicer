import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { map } from '@firebase/util';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Food } from '../share/food';
import { app } from './../../environments/environment';
import { getFirestore } from 'firebase/firestore'


const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})



export class FoodService {
  constructor(private firestore:Firestore,public toastController: ToastController) { }



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

  async  deleteFood (food:Food) {
    try{
      await deleteDoc(doc(db, "food", food.uid));
      this.presentToast('Eliminado correctamente.');
    } catch(error){
      console.log('error in delete' + error)
    }

  }

  async getFoods() : Promise<Array<Food>>{
    let foodList:Array<Food> = [];
    const querySnapshot = await getDocs(collection(this.firestore, "food"));
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

    return foodList;
  }

  async getFoodsByExpiration() : Promise<Array<Food>>{
    let today = new Date();
    let foodList:Array<Food> = [];
    const querySnapshot = await getDocs(collection(this.firestore, "food"));
    querySnapshot.forEach((doc) => {
      let dateToday =moment(this.addDays(today,5), 'MM-DD-YYYY'); 
      let expirationDAte = moment(new Date(doc.data().expiration), 'MM-DD-YYYY')
      if(expirationDAte <= dateToday){
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
      }   
    });

    return foodList;
  }

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

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
   convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
  }

}
