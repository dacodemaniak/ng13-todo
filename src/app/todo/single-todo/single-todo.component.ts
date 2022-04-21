import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo-model';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.scss']
})
export class SingleTodoComponent implements OnInit {
  @Input() public singleTodo!: TodoModel;
  @Output() public onRemove: EventEmitter<TodoModel> = new EventEmitter<TodoModel>();
  
  public showDetail = false;

  constructor() { }

  ngOnInit(): void {}

  public removeTodo(): void {
    console.log(`About to remove ${this.singleTodo.id}`);
    this.onRemove.emit(this.singleTodo);
  }

}
