import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable, Subject, take } from 'rxjs';
import { TodoModel } from '../../models/todo-model';
import { ITodo } from '../interfaces/i-todo';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: TodoModel[] = [];

  private todosNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
    ) {
    //this._initialize();
    
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
   */
  public addTodo(todo: ITodo): void {
    let todosNumber: number;

    this.getAll()
      .pipe(
        take(1),
        map((iTodos: ITodo[]) => {
          todosNumber = iTodos.length;
          return iTodos
            .sort((iTodo1: ITodo, iTodo2: ITodo) => iTodo2.id - iTodo1.id)[0].id + 1
        })
      ).subscribe((nextId: number) => {
        todo.id = nextId;
        // Now, we can post the new todo !
        this.httpClient.post<ITodo>(
          `${environment.api}/todos`,
          todo,
          { observe: 'response'}
        ).subscribe((response: HttpResponse<any>) => {
          console.log(`Post returns a ${response.status} http status`);
          this.todosNumber$.next(todosNumber + 1);
        })
      })
  }

  public removeTodo(todo: TodoModel): void {
    this.httpClient.delete<TodoModel>(
      `${environment.api}/todos/${todo.id}`,
      {
        observe: 'response'
      }
    )
    .pipe(
      take(1)
    )
    .subscribe((response: HttpResponse<any>) => {
      this.snackBar.open(
        'Todo was deleted',
        'Got It',
        {
          duration: 2500,
          verticalPosition: 'top'
        }
      );
      this.getAll()
        .pipe(
          take(1)
        ).subscribe((iTodos: ITodo[]) => this.todosNumber$.next(iTodos.length))
    })
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
