import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-pane',
  templateUrl: './edit-pane.component.html',
  styleUrls: ['./edit-pane.component.css']
})
export class EditPaneComponent implements OnInit {

  enteredValue = '';
  private todoId: string;
  todo: Todo;
  type: string;

  onEditToDo(form: NgForm) {
    if (form.value.editInput <= 0) {
      return;

    } else {
      console.log('About to Update Todo#: ', this.todoId );
      this.todoService.updateTodo(
        this.todoId,
        form.value.editInput,
        form.value.editNotes,
        'todo');
    }

  }

 
  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

   ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.todoId = paramMap.get('todoId');
      // this.type = paramMap.get('type');

      console.log('Todo EDIT ID *Edit Pane* is: ', this.todoId);
      // console.log('Todo EDIT TYPE is: ', this.type);
      this.todo = this.todoService.getSingleTodo(this.todoId);

    });

   }

}

