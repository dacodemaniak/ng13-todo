import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent,
    SingleTodoComponent,
    ToolbarComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: []
})
export class TodoModule { }
