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

  routeType: string;


  toggleEdit() {
    this.todoService.open();
  }


  todos: Todo[] = [];
  private todoSub: Subscription;

  constructor(public todoService: TodoService) { 

    console.log('Inside the TOOD LIST Component Constructor');
  }


  ngOnInit() {
    this.routeType = this.todoService.getType();
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.todos = todos.filter(t => t.type === this.routeType);
    });

  
    console.log('NgOnInit: Todo-List', this.routeType);

  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}
