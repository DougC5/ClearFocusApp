import { Observable, Subscription } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AutofillMonitor } from '@angular/cdk/text-field';


@Component({
  selector: 'app-edit-pane',
  templateUrl: './edit-pane.component.html',
  styleUrls: ['./edit-pane.component.css']
})
export class EditPaneComponent implements OnInit, OnDestroy {

  enteredValue = '';
  private todoId: string;
  todo: Todo;
  todoP: Todo;
  todoC: Todo[];
  routeType: string;
  placeholder: string;
  isloading = false;
  newNotes: string;


  myControl = new FormControl();
  filteredOptions: Observable<Todo[]>;
  parentList: Todo[] = [];
  parentType: string;
  parentId: string;
  placeHolderObject: Todo;
  private todoSub: Subscription;

  onEditToDo(form: NgForm) {

  // Placeholder manipulation statements
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

    // Update Todo Function
    this.todoService.updateTodo(
        this.todoId,
        form.value.editInput,
        form.value.editNotes,
        this.routeType,
        this.parentId,
        this.todo.isScheduledCal,
        this.todo.start
        );

        // Update placeholder after new information has been sent to the server
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

  onCloseEditPane(){
    this.todoService.close()
  }

  // Notes Dialog Box "Open" function
  openDialog() {
    const dialogRef = this.dialog.open(EditPaneNotesDialog, {
      height: '400px',
      width: '600px',
      data: {notes: this.todo.notes, title: this.todo.title}
    });

    // Notes Dialog Box "On Close" function
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newNotes = result;
      console.log('this.newNotes: ', this.newNotes);
      this.todoService.updateTodo(
        this.todoId,
        this.todo.title,
        this.newNotes,
        this.routeType,
        this.parentId,
        this.todo.isScheduledCal,
        this.todo.start
        );
    });

    // this.todo = this.todoService.getSingleTodo(this.todoId);
  }

  constructor(public todoService: TodoService,
              public route: ActivatedRoute,
              public dialog: MatDialog) { }

   ngOnInit() {
    console.log('***IM INSIDE THE EDIT PANE ONINIT');

    this.isloading = true;

    //Route Map subscription
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

    // this.todoSub = this.todoService.getTodoUpdateListener()
    // .subscribe((todos: Todo[]) => {
    //   this.todo = todos.find(a => a._id === this.todoId);
    //   this.todoP = this.todoService.getSingleTodo(this.todo.parent);
    //   this.placeHolderObject = this.todoP;

    //   if (this.todoP._id === undefined) {
    //       this.placeholder = 'Assign ' + this.parentType;
    //     } else {
    //       this.placeholder = this.todoP.title;
    //     }
    //   });

    console.log('this.todo: ', this.todo);

    console.log("this.todoId", this.todoId);

    // Parent Filtering Pipe
    console.log('**SELECTOR** Route: ', this.routeType, ' Parent: ', this.parentList);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(name => name ? this._filter(name) : this.parentList.slice()
      ));

    this.isloading = false;
   }

  // Parent filtering function
   displayFn(parent?: Todo): string | undefined {
    return parent ? parent.title : undefined;
  }

  private _filter(name: string): Todo[] {
    const filterValue = name.toLowerCase();

    return this.parentList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

ngOnDestroy(): void {
  // this.todoSub.unsubscribe();
}

}

// Edit Pane Notes Dialog Box Component

@Component({
  selector: 'edit-pane-notes-dialog',
  templateUrl: 'edit-pane-notes-dialog.html',
  styleUrls: ['./edit-pane.component.css']
})
export class EditPaneNotesDialog {

  constructor(
    public dialogRef: MatDialogRef<EditPaneNotesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditPaneComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
