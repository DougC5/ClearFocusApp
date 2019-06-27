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

  type: string;


  toggleEdit() {
    this.todoService.open();
  }


  todos: Todo[] = [];
  private todoSub: Subscription;

  constructor(public todoService: TodoService) { 

    console.log('Inside the TOOD LIST Component Constructor');
  }


  ngOnInit() {
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.todos = todos;});

    // this.type = this.todoService.getType();
    // console.log('NgOnInit: Todo-List', this.type);

  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}
