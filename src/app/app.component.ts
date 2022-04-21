import { Component } from '@angular/core';
import { TodoModel } from './models/todo-model';
import { TodoService } from './services/todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'todo';
  private oldTitle = '';

  public showPassword: boolean;

  public counter: number;

  public names: string[] = [];

  public todos: TodoModel[];

  public today = new Date();

  // 0 => all
  // 1 => today
  // 2 => future
  // -1 => past
  public compare: number = 0;

  public constructor(
    private todoService: TodoService
  ) {
    this.counter = 1;
    this.showPassword = false;

    // Feed the array
    this.names.push('Jean-Luc');
    this.names.push('Mohamed');
    this.names.push('Leila');

    //this.today.setHours(0,0,0,0);

    this.todos = this.todoService.getTodos();
  }

  public changeTitle(): void {
    this.oldTitle = this.title;
    this.title = this.oldTitle === 'todo' ? 'Nouveau titre' : 'todo';
  }

  public increment(): void {
    if (this.counter < 10) {
      this.counter++;
    }
  }

  public decrement(): void {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  public testDate(todo: TodoModel): boolean {
    if (this.compare === 0) {
      return true;
    }

    if (this.compare === -1) {
      return todo.date < this.today;
    }

    if (this.compare === 1) {
      const day: number = todo.date.getDate();
      const month: number = todo.date.getMonth();
      const year: number = todo.date.getFullYear();

      return day === this.today.getDate() &&
        month === this.today.getMonth() &&
        year === this.today.getFullYear();
    }

    if (this.compare === 2) {
      return todo.date > this.today;
    }

    return false;
  }
}
