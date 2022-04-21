import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './todo/list/list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo/list',
    pathMatch: 'full'
  },
  {
    path: 'todo/list',
    component: ListComponent
  },
  {
    path: 'todo/add',
    component: TodoFormComponent
  },
  {
    path: '**',
    redirectTo: 'todo/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
