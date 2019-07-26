import { TodoService } from './../../lists/todo/todos.service';
import { Todo } from './../../lists/todo/todo.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qtr',
  templateUrl: './qtr.component.html',
  styleUrls: ['./qtr.component.css']
})
export class QtrComponent implements OnInit, OnDestroy {

  todos: Todo[];
  focusGoals: Todo[];
  nonFocus: Todo[];
  private todoSub: Subscription;


  constructor(public todoService: TodoService) { }

   ngOnInit() {
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.todos = todos.filter(t => t.type !== 'ToDo');
      this.focusGoals = this.todos.filter(t => t.isFocus === true);
      this.nonFocus = this.todos.filter(t => t.isFocus === false);
      console.log('this.todos: ', this.todos);
      console.log('this.focusGoals: ', this.focusGoals);
      console.log('this.focusGoals: ', this.focusGoals);
    });

    
    

    // this.events = this.events.filter(iEvent => iEvent !== event);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      if (event.container.data[event.currentIndex].isFocus === false) {
        this.todoService.updateFocus(
          event.container.data[event.currentIndex]._id,
          event.container.data[event.currentIndex].title,
          event.container.data[event.currentIndex].type,
          event.container.data[event.currentIndex].start,
          event.container.data[event.currentIndex].isScheduledCal,
          true);
      } else {
        this.todoService.updateFocus(
          event.container.data[event.currentIndex]._id,
          event.container.data[event.currentIndex].title,
          event.container.data[event.currentIndex].type,
          event.container.data[event.currentIndex].start,
          event.container.data[event.currentIndex].isScheduledCal,
          false);
      }
    
    }
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}

// this.todoService.updateFocus(id: string, title: string, type: string, start: Date,isScheduledCal: boolean, isFocus: boolean )
