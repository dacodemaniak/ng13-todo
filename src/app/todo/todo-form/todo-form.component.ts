import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo-model';
import { TodoService } from 'src/app/todo/services/todo.service';
import { ITodo } from '../interfaces/i-todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  public todoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const today: Date = new Date();

    this.todoForm = this.formBuilder.group({
      title: [
        '', // Default value
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      description: [
        ''
      ],
      day: [
        today.getDay(),
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(31)
        ])
      ],
      month: [
        today.getMonth() + 1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ])
      ],
      year: [
        today.getFullYear(),
        Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ]
    });
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.todoForm.controls;
  }

  public onSubmit(): void {
    console.log(`Form was submitted : ${JSON.stringify(this.todoForm.value)}`);
    // Serialize a real TodoModel Object
    const todoDate: Date = new Date(this.c['year'].value, this.c['month'].value, this.c['day'].value);

    const todo: ITodo = {
      id: 0,
      title: this.c['title'].value,
      description: this.c['description'].value,
      date: todoDate
    };

    /**
    todo.title = this.c['title'].value;
    todo.description = this.c['description'].value;
    todo.date = todoDate;
    */
    console.log(`Todo about to be pushed : ${JSON.stringify(todo)}`);

    this.todoService.addTodo(todo);

    // Now route to todo/list
    //this.router.navigate(['todo', 'list']);
  }
}
