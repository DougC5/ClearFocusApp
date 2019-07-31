import { TodoService } from './../todos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { Subscription } from "rxjs";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.3, 0.4, 0.51, 1)')),
    ]),
  ],
})
export class TodoListsComponent implements OnInit, OnDestroy {

  // @ViewChildren('myVar') createdItems;

  filterMetadata = { count: 0 };

  todos: Todo[] = [];
  childArray: Todo[];
  parent: Todo;
  private todoSub: Subscription;
  routeType: string;
  displayedColumns = ['position', 'name', 'tasks', 'parent', 'edit'];
  expandedElement: Todo | null;
  parentTodo: string;
  editID: string;
  dataSource: Todo [];
  parentType: string;
  childType: string;
  isLoading = false;



  constructor(public todoService: TodoService) { }


  ngOnInit() {
    this.routeType = this.todoService.getType();
    this.childArray = this.todoService.getChildTodosArray();
    this.todoService.getTodos();
    this.isLoading = true;
    this.todoSub = this.todoService.getTodoUpdateListener()
    .subscribe((todos: Todo[]) => {
      this.isLoading = false;
      this.todos = todos.filter(t => t.type === this.routeType);
      this.dataSource = this.todos;
      this.parentType =  this.todoService.getParentType(this.routeType);
      this.childType =  this.todoService.getChildType(this.routeType);

    });

  
    console.log('NgOnInit: Todo-List', this.todos);

  }

  // Open and close the edit pane
  toggleEdit(id) {
    if (id !== this.editID){
      this.todoService.open();
      this.editID = id;
    } else {
      this.todoService.toggle();
      this.editID = id;
    }

  }
  // Getting the Parent Tasks' name
  getParentName(id){
    this.parent = this.todoService.getSingleTodo(id)
    return this.parent.title;
  }

  // Gets if the item is a focus item or not
  isFocus(id) {
    this.parent = this.todoService.getSingleTodo(id);
    if (this.parent.isFocus) {
      return true;
    }
    const gpId = this.parent.parent;
    const gp = this.todoService.getSingleTodo(gpId);
    if (gp.isFocus) {
      return true;
    }
    const ggpId =  gp.parent;
    const ggp = this.todoService.getSingleTodo(ggpId);
    if (ggp.isFocus) {
      return true;
    }
    const gggpId = ggp.parent;
    const gggp = this.todoService.getSingleTodo(gggpId);
    if (gggp.isFocus) {
      return true;
    }
    const ggggpId = gggp.parent;
    const ggggp = this.todoService.getSingleTodo(ggggpId);
    if (ggggp.isFocus) {
      return true;
    }
    return false;
  }

  // Delete single task
  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }

  // unsubscribe
  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

}
