import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo-model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: TodoModel[] = [];

  constructor() {
    this._initialize();
  }

  public getTodos(): TodoModel[] {
    return this.todos;
  }

  private _initialize(): void {
    let todo: TodoModel = new TodoModel();
    todo.id = 1;
    todo.title = 'Premier todo';
    todo.description = 'Description du premier todo';
    todo.date = new Date();

    this.todos.push(todo);

    todo = new TodoModel();
    todo.id = 2;
    todo.title = 'Second todo';
    todo.description = 'Description du deuxième todo';
    todo.date = new Date('2022-04-19');

    this.todos.push(todo);

    todo = new TodoModel();
    todo.id = 3;
    todo.title = 'Troisième todo';
    todo.description = 'Description du troisième todo';
    todo.date = new Date('2022-04-22');

    this.todos.push(todo);
  }

}
