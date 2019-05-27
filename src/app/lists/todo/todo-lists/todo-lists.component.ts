import { TodoService } from './../todos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit, OnDestroy {

  // todos = [
  //   {title: 'first item', content: 'this is the 1st posts content'},
  //   {title: 'Second item', content: 'this is the 2nd posts content'},
  //   {title: 'Third item', content: 'this is the 3rd posts content'},
  // ];

  todos: Todo[] = [];
  private todoSub: Subscription;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}
