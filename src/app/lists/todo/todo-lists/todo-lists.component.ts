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

  todos: Todo[] = [];
  parent: Todo;
  private todoSub: Subscription;
  routeType: string;
  displayedColumns = ['position', 'name', 'parent', 'edit'];
  parentTodo: string;
  editID: string;


  constructor(public todoService: TodoService) { }


  ngOnInit() {
    this.routeType = this.todoService.getType();
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.todos = todos.filter(t => t.type === this.routeType);
    });

  
    console.log('NgOnInit: Todo-List', this.todos);

  }

  toggleEdit(id) {
    if (id !== this.editID){
      this.todoService.open();
      this.editID = id;
    } else {
      this.todoService.toggle();
      this.editID = id;
    }

  }

  getParentName(id){
    this.parent = this.todoService.getSingleTodo(id)
    return this.parent.title;
  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}
