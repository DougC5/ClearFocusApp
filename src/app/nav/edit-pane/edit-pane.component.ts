import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-edit-pane',
  templateUrl: './edit-pane.component.html',
  styleUrls: ['./edit-pane.component.css']
})
export class EditPaneComponent implements OnInit {

  enteredValue = '';
  private sub: any;
  private todoId: string;
  todo: Todo;
  routeType: string;

  onEditToDo(form: NgForm) {
    if (form.value.editInput <= 0) {
      return;

    } else {
      console.log('About to Update Todo#: ', this.todoId );
      this.todoService.updateTodo(
        this.todoId,
        form.value.editInput,
        form.value.editNotes,
        this.routeType);
    }

  }

 
  constructor(public todoService: TodoService, private router: Router , public route: ActivatedRoute) { }

   ngOnInit() {
    console.log('***IM INSIDE THE EDIT PANE ONINIT');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.todoId = paramMap.get('todoId');
      console.log('Todo EDIT ID *Edit Pane* is: ', paramMap);
      this.todo = this.todoService.getSingleTodo(this.todoId);
    });

    this.routeType = this.todoService.getType();

   }
}


// ngOnInit() {
//   console.log('***IM INSIDE THE EDIT PANE ONINIT');
//   this.route.paramMap.subscribe((paramMap: ParamMap) => {
//     this.todoId = paramMap.get('todoId');
//     console.log('Todo EDIT ID *Edit Pane* is: ', this.todoId);
//     this.todo = this.todoService.getSingleTodo(this.todoId);
//   });

//   this.routeType = this.todoService.getType();

//  }

