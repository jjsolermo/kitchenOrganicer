import { Injectable } from '@angular/core';
import { Food } from './share/food';
import { collection, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
  constructor(private firestore: Firestore) { }
  
  createContact(food: Food): Promise<void> {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, food);
   }

}
