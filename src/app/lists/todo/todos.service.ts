import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { Subject} from "rxjs";
import { MatSidenav } from '@angular/material';


@Injectable({providedIn: 'root'})
export class TodoService {
    private todos: Todo[] = [];
    private todosUpdated = new Subject<Todo[]>();
    public editState: boolean;
    private sidenav: MatSidenav;
    public type: string;

    parent = {
            ToDo: 'Projects',
            Projects: 'Goals',
            Goals: 'Vision',
            Vision: 'Purpose',
            Purpose: null,
        }

    child = {
            ToDo: null,
            Projects: 'Todo',
            Goals: 'Projects',
            Vision: 'Goals',
            Purpose: 'Vision',
        }

    constructor (private http: HttpClient) {    }

    public setType(type: string) {
        this.type = type;
    }

    public getType(){
        return this.type;
    }

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }

    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
    this.sidenav.toggle();
   }


    public getParentType(key: string){
        return this.parent[key];
    }

    getParentTodosArray(){
        return [...this.todos.filter(p => p.type === this.getParentType(this.type))];
    }

    getTodos() {
        this.http.get<{message: string, todos: Todo[]}>('http://localhost:3000/api/todos')
        .subscribe((todoData) => {
         this.todos = todoData.todos;
         this.todosUpdated.next([...this.todos]);
        });
    }

    getTodo(id: string) {
        return {...this.todos.find(p => p._id === id)};

    }

    getTodoUpdateListener() {
        return this.todosUpdated.asObservable();
    }


    getSingleTodo(id: string) {
        return {...this.todos.find(p => p._id === id)};
    }

    addTodo(title: string, type: string) {
        const todo: Todo = {
            _id: null,
            title: title,
            type: type,
            notes: null,
            project: null,
            children: null,
            parent: null };
        this.http.post<{message: string, todoId: string}>('http://localhost:3000/api/todos/', todo)
        .subscribe((responseData) => {
            const todoId = responseData.todoId;
            todo._id = todoId;
            this.todos.push(todo);
            this.todosUpdated.next([...this.todos]);
        });
    }

    updateTodo(id: string, title: string, notes: string, type: string, parent: string){
        const todo: Todo = {
            _id: id, 
            title: title,
            type: type,
            notes: notes,
            project: null,
            children: null,
            parent: parent,};
        this.http.put('http://localhost:3000/api/todos/' + id, todo)
        .subscribe(response => {
            const updatedTodos = [...this.todos];
            const oldTodoIndex = updatedTodos.findIndex(t => t._id === todo._id);
            updatedTodos[oldTodoIndex] = todo;
            this.todos = updatedTodos;
            this.todosUpdated.next([...this.todos]);
        });
    }

    deleteTodo(todoId: string) {
        this.http.delete('http://localhost:3000/api/todos/' + todoId)
        .subscribe(() => {
            this.todos = this.todos.filter(todo => todo._id !== todoId);
            this.todosUpdated.next([...this.todos]);
        });
    }

}