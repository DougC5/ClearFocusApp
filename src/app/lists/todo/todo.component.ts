import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  enteredValue = '';

  onAddToDo(form: NgForm) {
    if (form.value.toDoInput <= 0) {
      return;
    }
    this.todoService.addTodo(form.value.toDoInput);
    form.resetForm();
  }

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

}
