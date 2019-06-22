import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  enteredValue = '';
  private mode = 'create';
  private todoId: string;
  todo: Todo;

  onAddToDo(form: NgForm) {

    if (form.value.toDoInput <= 0) {
      return;
    }
    
    if (this.mode === 'create') {
      console.log('this.mode (if) is: ', this.mode);
      this.todoService.addTodo(form.value.toDoInput);
    } else {
      console.log('this.mode (else) is: ', this.mode);
      this.todoService.updateTodo(
        this.todoId,
        form.value.toDoInput
      );
    }
    
    form.resetForm();
  }

  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

   ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.todoId = paramMap.get('todoId');

      if (this.todoId) {
        console.log('Todo ID is: ', this.todoId);
        this.mode = 'edit';
        this.todo = this.todoService.getSingleTodo(this.todoId);
        console.log('IDCHECK mode is: ', this.mode);

      } else {
        this.mode = 'create';
        this.todoId = null;
        console.log('IDCHECK mode is: ', this.mode);
      }
    });
   }

}
