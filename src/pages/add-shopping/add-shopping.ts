import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShoppingItem} from '../../models/shopping-item/shopping-item.interface';
import { AngularFireList,AngularFireObject,AngularFireDatabase } from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
  
 shoppingItem = {} as ShoppingItem 
  fireref$ : AngularFireList<any[]>
  secondfiref$:Observable<any[]>
  //fireconnect$ : FirebaseListObservable<any[]>
  item:any = {
    name:"",
    number:"",
  }
   constructor(private navCtrl: NavController, private navParams: NavParams, 
    private database:AngularFireDatabase) {
    this.fireref$ = this.database.list("shopping-list");
   // this.fireconnect$ = this.database.list("shopping-list");
  }
  AddShoppingItemFunction(shopping:ShoppingItem){
    Number(this.item.number);
  this.fireref$.push(this.item);
  //this.fireconnect$.push(this.item);
  this.navCtrl.push("ShoppingListPage");
  }
  

}
