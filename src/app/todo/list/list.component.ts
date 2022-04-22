import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/todo/services/todo.service';
import { ITodo } from '../interfaces/i-todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public todos: TodoModel[] = [];
  public iTodos: ITodo[] = [];
  public dummyTodos: TodoModel[] = [];

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    //this.todos = [... this.todoService.getTodos()];
    this.todoService.all()
      .subscribe((todoList: TodoModel[]) => {
        this.todos = todoList;
        console.log(`Got ${JSON.stringify(todoList)} from backend`);
      });

    this.todoService.getAll()
      .subscribe((iTodoList: ITodo[]) => this.iTodos = iTodoList);

    this.todoService.getDummyAll()
      .subscribe((dummyTodos: TodoModel[]) => this.dummyTodos = dummyTodos);
    
  }

  ngOnDestroy(): void {}

  public removeTodo(event: TodoModel): void {
    console.log(`Okay, i have to remove ${event.id}`);

    this.todos.splice(
      this.todos.findIndex((todo: TodoModel) => todo.id === event.id),
      1
    );
  }

  public dayPast(todo: TodoModel): number | string {
    const today: moment.Moment = moment();
    const todoDate: moment.Moment = moment(todo.date);

    if (todoDate.isBefore(today, 'd')) {
        return today.diff(todoDate, 'd');
    }

    return 'Todo was not fired yet';
  }

}
