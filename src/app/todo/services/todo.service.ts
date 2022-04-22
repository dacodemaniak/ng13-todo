import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { TodoModel } from '../../models/todo-model';
import { ITodo } from '../interfaces/i-todo';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: TodoModel[] = [];

  private todosNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
    this._initialize();
    this.todosNumber$.next(this.todos.length);
    console.log(`Next was fired with : ${this.todos.length}`);
  }

  public all(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(
      `${environment.api}/todos` // Endpoint URI
    )
    .pipe( // Chain multiple operations to an Observable
      map((response: any[]) => { // Transform an Observable to another Observable
        this.todosNumber$.next(response.length);
        return response.map((data: any) => { // Transform an array to another array
          const todo: TodoModel = new TodoModel();
          todo.title = data.title;
          todo.description = data.description;
          todo.id = data.id;
          todo.date = new Date(data.date);
          return todo;
        })
      })
    );
  }

  public getAll(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(
      `${environment.api}/todos`
    );
  }

  public getDummyAll(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(
      `${environment.api}/todos`
    );
  }

  public getTodosNumber(): Subject<number> {
    return this.todosNumber$;
  }

  public getTodos(): TodoModel[] {
    return this.todos;
  }

  /**
   * 
   * @param todo 
   * 
   * @todo Calculate next id
   */
  public addTodo(todo: TodoModel): void {
    // Trouver l'id le plus grand du tableau des todos
    let highestId: number = -1;
    for(let i: number = 0; i < this.todos.length; i++) {
      const todo: TodoModel = this.todos[i];
      if (todo.id > highestId) {
        highestId = todo.id;
      }
    }
    highestId = highestId + 1;
    
    // Version spécifique language
    highestId = [... this.todos].sort(
      (obj1: TodoModel, obj2: TodoModel) => obj2.id - obj1.id
    )[0].id + 1;

    todo.id = highestId;

    this.todos.push(todo);
    console.log(`Now, we have ${this.todos.length} todos`);

    this.todosNumber$.next(this.todos.length);
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
