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
  routeType: string;

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
    // console.log('TODO CONSTRUCTOR');
   }

   ngOnInit() {
    this.route.url.subscribe((u) => {
      try {
      console.log("TODO COMPONENT ROUTE: ", this.route.snapshot.url[0].path);
      this.routeType = this.route.snapshot.url[0].path;
      }
      catch{
        console.log('routeType should be set to Todo');
      }
    });
   }

   ngAfterViewInit(){
 
   }

}
