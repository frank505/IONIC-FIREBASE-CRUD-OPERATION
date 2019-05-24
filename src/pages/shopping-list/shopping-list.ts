import { NgZone ,Component} from '@angular/core';
import { IonicPage, NavController,Content, NavParams,ActionSheetController } from 'ionic-angular';
import {AngularFireList,AngularFireDatabase,AngularFireObject} from "angularfire2/database";
import { Observable} from 'rxjs/Observable';
import {ITEM_VALUE} from '../../models/shopping-item/shopping-item-second.interface';
import { Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';
//import { } from 'ionic-angular';
//import {FirebaseListObservable,AngularFireDatabaseProvider} from "angularfire2/database-deprecated";
/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
 // @ViewChild(Content) content: Content;
  listings: any[] = []
  fireref$ : AngularFireList<any[]>
  secondfireref$:Observable<any[]>
  thirdfiref$ : AngularFireObject<any[]>
  //fourthref$ : Observable<any[]>
  
    constructor(public navCtrl: NavController, public navParams: NavParams,
    private database:AngularFireDatabase, private actionsheet:ActionSheetController) {
    this.fireref$ = this.database.list("shopping-list");
    this.secondfireref$ = this.database.list("shopping-list").snapshotChanges();
    this.thirdfiref$ = this.database.object("shopping-list");
    //this.fourthref$ = this.database.list("shopping-list");
    this.secondfireref$.forEach(item => {
     // console.log('Item:', item);
  });
   
   }


  
   ionViewDidLoad(){
    this.secondfireref$.subscribe(actions => {
      actions.forEach(action => {
          this.listings.push(
           {'key': action.key,
         'name':action.payload.val().name,
         'number':action.payload.val().number}
       );
       }); 
        });
        return this.listings;  
   }

  

  NavigateToAddShoppingPage():any{
   return this.navCtrl.push('AddShoppingPage');
  }

selectShoppingItem(parameter:any){
 this.actionsheet.create({
   title: `do you want to delete ${parameter.name} `,
   buttons: [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
    this.fireref$.remove(parameter.key);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
    },
     {
      text: 'Edit',
      handler: () => {
        
      }
    },{
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      }
    }
  ]
 }).present();
}



}
