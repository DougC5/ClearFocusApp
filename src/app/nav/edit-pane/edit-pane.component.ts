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
  placeholder: string;

  // Parent Controls
  myControl = new FormControl();
  filteredOptions: Observable<Todo[]>;
  parentList: Todo[] = [];
  parentType: string;
  parentId: string;
  placeHolderObject: Todo;

  onEditToDo(form: NgForm) {


    if (this.placeholder === this.todoP.title) {

      if (this.myControl.value === undefined || this.myControl.value === null) {
        this.parentId = this.placeHolderObject._id;

      } else if (this.placeholder === this.myControl.value.title) {
        this.parentId = this.myControl.value._id;
        this.placeHolderObject = this.myControl.value;

      } else {
        if (this.myControl.value.title === undefined || this.myControl.value.title === null) {
          this.parentId = this.placeHolderObject._id;

        } else {
          this.parentId = this.myControl.value._id;
        }
      }

    } else if (this.placeholder !== 'Assign ' + this.parentType) {
      if (this.myControl.value._id === undefined) {
        this.parentId = this.placeHolderObject._id;

      } else {
       this.parentId = this.myControl.value._id;
       this.placeHolderObject = this.myControl.value;

      }

    } else if (this.myControl.value === null) {
        this.parentId = undefined;
        this.placeholder = 'Assign ' + this.parentType;

    } else {
      this.parentId = this.myControl.value._id;
      this.placeHolderObject = this.myControl.value;
    }

    this.todoService.updateTodo(
        this.todoId,
        form.value.editInput,
        form.value.editNotes,
        this.routeType,
        this.parentId
        );

    if (this.myControl.value === null || this.myControl.value === '') {
          this.myControl.reset({ value: '', disabled: false });
          if (this.placeHolderObject.title === undefined) {
            this.placeholder = 'Assign ' + this.parentType;
            } else {
            this.placeholder = this.placeHolderObject.title;
            }

        } else {
          this.placeHolderObject = this.myControl.value;
          this.placeholder = this.myControl.value.title;
          this.myControl.reset({ value: '', disabled: false });
        }

  }



  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

   ngOnInit() {
    console.log('***IM INSIDE THE EDIT PANE ONINIT');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.todoId = paramMap.get('todoId');
      console.log('Todo EDIT ID *Edit Pane* is: ', paramMap);
      this.routeType = this.todoService.getType();
      this.todo = this.todoService.getSingleTodo(this.todoId);
      this.todoP = this.todoService.getSingleTodo(this.todo.parent);
      this.placeHolderObject = this.todoP;
      this.parentType =  this.todoService.getParentType(this.routeType);

      if (this.todoP._id === undefined) {
        this.placeholder = 'Assign ' + this.parentType;
      } else {
        this.placeholder = this.todoP.title;
      }

    });


    this.parentList = this.todoService.getParentTodosArray();


    console.log('**SELECTOR** Route: ', this.routeType, ' Parent: ', this.parentList);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(name => name ? this._filter(name) : this.parentList.slice()
      ));


   }

   displayFn(parent?: Todo): string | undefined {
    return parent ? parent.title : undefined;
  }

  private _filter(name: string): Todo[] {
    const filterValue = name.toLowerCase();

    return this.parentList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

}
