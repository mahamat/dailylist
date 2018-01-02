import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { FirestoreServiceProvider } from "../../providers/firestore-service/firestore-service";
import { ITodo } from "../../models/todo.interface";
import { ICategory } from "../../models/category.interface";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  todos: ITodo[];
  categories: ICategory[];
  date: String = new Date().toDateString();
  completed: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public fsService: FirestoreServiceProvider
  ) {
    this.fsService.categories$
      .switchMap(categories => {
        this.categories = categories;
        return this.fsService.todos$;
      })
      .subscribe(docs => {
        this.todos = docs.map(doc => {
          doc.category = this.categories.find(
            category => category.id == doc.category
          );
          return doc;
        });
        this.completed = docs.filter(item => item.completed).length;
        
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }

  onTodoAdd() {
    let todoAddModal = this.modalCtrl.create("TodoAddPage");
    todoAddModal.present();
  }

  onComplete(obj: any) {
    this.fsService.update(obj);
  }
  onDelete(obj: any) {
    const { id } = obj;
    if (id) {
      this.fsService.delete(id);
    }
  }
}
