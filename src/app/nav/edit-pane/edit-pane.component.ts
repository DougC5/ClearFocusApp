import { Observable } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit } from '@angular/core';

import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-edit-pane',
  templateUrl: './edit-pane.component.html',
  styleUrls: ['./edit-pane.component.css']
})
export class EditPaneComponent implements OnInit {


  enteredValue = '';
  private todoId: string;
  todo: Todo;
  todoP: Todo;
  todoC: Todo[];
  routeType: string;
  parentTodo: string;
  placeholder: string;
  value: string;

  //Parent Controls
  myControl = new FormControl();
  filteredOptions: Observable<Todo[]>;
  parentList: Todo[] = [];
  parentType: string;

  onEditToDo(form: NgForm) {
    if (form.value.editInput <= 0) {
      console.log('Triggering Return Clause')
      return;

    } else {
      console.log('About to Update Todo#: ', this.todoId );
      this.todoService.updateTodo(
        this.todoId,
        form.value.editInput,
        form.value.editNotes,
        this.routeType,
        this.myControl.value._id
        );
        console.log('Parent Input: ')
        this.placeholder = this.myControl.value.title;
        this.myControl.reset({ value: '', disabled: false });

    }

  }
  // form.value.parentInput._id

 
  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

   ngOnInit() {
    console.log('***IM INSIDE THE EDIT PANE ONINIT');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.todoId = paramMap.get('todoId');
      console.log('Todo EDIT ID *Edit Pane* is: ', paramMap);
      this.todo = this.todoService.getSingleTodo(this.todoId);
      this.todoP = this.todoService.getSingleTodo(this.todo.parent);
      this.parentType =  this.todoService.getParentType(this.routeType);
      if (this.todoP._id === undefined){
        this.placeholder = 'Assign ' + this.parentType;
      } else {
        this.placeholder = this.todoP.title;
      }
      
      console.log('Todo EDIT ID *PARENT* is: ', this.todoP);
    });

    this.routeType = this.todoService.getType();

    //Parent Selector******

    this.parentType =  this.todoService.getParentType(this.routeType);
    this.todoP = this.todoService.getSingleTodo(this.todo.parent);
    this.parentList = this.todoService.getParentTodosArray()


    console.log('**SELECTOR** Route: ', this.routeType, ' Parent: ', this.parentList)
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(name => name ? this._filter(name) : this.parentList.slice()
      ));

      console.log('Parent Item: ', this.todoP)

   }

   displayFn(parent?: Todo): string | undefined {
    return parent ? parent.title : undefined;
  }

  private _filter(name: string): Todo[] {
    const filterValue = name.toLowerCase();

    return this.parentList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

}
