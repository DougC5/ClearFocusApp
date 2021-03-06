import { Observable, Subscription } from 'rxjs';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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
  file: File;


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

    this.todo.notes = form.value.editNotes;

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

  // Close the Side Panel
  onCloseEditPane() {
    this.todoService.close();
  }

  // Notes Dialog Box "Open" function
  openDialog() {
    const dialogRef = this.dialog.open(EditPaneNotesDialog, {
      height: '500px',
      width: '600px',
      data: {notes: this.todo.notes, title: this.todo.title, file: this.file}
    });

    // Notes Dialog Box "On Close" function
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result === undefined) {
        return;

      } else {
      this.newNotes = result.notes;
      this.file = result.file;
      this.todo.notes = this.newNotes;
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
      }
    });

    // this.todo = this.todoService.getSingleTodo(this.todoId);
  }

  

  notesUpdated() {
    this.todo = this.todoService.getSingleTodo(this.todoId);
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
export class EditPaneNotesDialog implements OnInit {

  form: FormGroup;
  filePreview: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileAdded(event: Event) {
    const newFile = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: newFile});
    this.form.get('file').updateValueAndValidity();
    console.log('this.form: ', this.form);
    console.log('new file: ', newFile);
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(newFile);

  }

  constructor(
    public dialogRef: MatDialogRef<EditPaneNotesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditPaneComponent) {}

    ngOnInit(){

      this.form = new FormGroup({
        file: new FormControl(null)
      });
    }

  

}
