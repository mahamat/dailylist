import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirestoreServiceProvider } from "../../providers/firestore-service/firestore-service";
import { ICategory } from "../../models/category.interface";
import { ITodo } from "../../models/todo.interface";

@IonicPage()
@Component({
  selector: "page-todo-add",
  templateUrl: "todo-add.html"
})
export class TodoAddPage {
  addTodoForm: FormGroup;
  error: string;
  success: string;
  categories: ICategory[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    public fsService: FirestoreServiceProvider
  ) {
    this.createForm();
    this.fsService.categories$.subscribe(items => {
      this.categories = items;
    });
  }

  createForm() {
    this.addTodoForm = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      time: [""]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TodoAddPage");
  }

  onSubmit(form: any) {
    if (form.valid) {
      const data = {
        name: form.value.name,
        category: form.value.category,
        time:form.value.time,
        completed: false
      };
      this.fsService
        .add(data)
        .then(result => {
          console.log(result);
          this.closeModal();
        })
        .catch(err => this.error = err);
    }
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
