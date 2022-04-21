import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TodoFormComponent } from './todo-form/todo-form.component';



@NgModule({
  declarations: [
    ListComponent,
    SingleTodoComponent,
    ToolbarComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodoModule { }
