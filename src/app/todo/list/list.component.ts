import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public todos: TodoModel[] = [];

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todos = [... this.todoService.getTodos()];
  }

  ngOnDestroy(): void {}

  public removeTodo(event: TodoModel): void {
    console.log(`Okay, i have to remove ${event.id}`);
    const index: number = this.todos.findIndex(
      (todo: TodoModel) => todo.id === event.id
    );
    this.todos.splice(index, 1);

    /**
    this.todos.splice(
      this.todos.findIndex((todo: TodoModel) => todo.id === event.id),
      1
    );
    */
  }

}
