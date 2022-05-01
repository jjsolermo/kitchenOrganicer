import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { collection, collectionData, doc, docData, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Place } from '../share/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private firestore:Firestore,public toastController: ToastController) { }

  createPlace(place: Place): Promise<void> {
    const document = doc(collection(this.firestore, 'places'));
    return setDoc(document, place);
   }
   async getPlaces() : Promise<Array<Place>>{
    let placeList:Array<Place> = [];
    const querySnapshot = await getDocs(collection(this.firestore, "places"));
    querySnapshot.forEach((doc) => {
      var place:Place = {
        uid: doc.id,
        key: doc.data().key,
        value: doc.data().value,
      }
      placeList.push(place);
    });
    return placeList;
  }
}
