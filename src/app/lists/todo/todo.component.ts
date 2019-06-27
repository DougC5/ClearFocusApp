import { NgForm } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TodoService } from './todos.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewInit {

  enteredValue = '';
  private mode = 'create';
  private todoId: string;
  todo: Todo;
  type: 'todo';

  onAddToDo(form: NgForm) {

    if (form.value.toDoInput <= 0) {
      return;
    } else {

    console.log('this.mode (if) is: ', this.mode);
    this.todoService.addTodo(form.value.toDoInput, 'todo');
    }

    form.resetForm();
  }

  constructor(public todoService: TodoService, public route: ActivatedRoute) {
    console.log('TODO CONSTRUCTOR');
   }

   ngOnInit() {
    // this.todoService.setType('todo');
    console.log('TODO ONINIT');
   }

   ngAfterViewInit(){
 
   }

}
