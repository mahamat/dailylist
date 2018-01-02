import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoAddPage } from './todo-add';

@NgModule({
  declarations: [
    TodoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoAddPage),
  ],
})
export class TodoAddPageModule {}
