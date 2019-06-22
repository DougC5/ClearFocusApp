import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { post } from 'selenium-webdriver/http';
import { viewParentEl } from '@angular/core/src/view/util';

@Injectable({providedIn: 'root'})
export class TodoService {
    private todos: Todo[] = [];
    private todosUpdated = new Subject<Todo[]>();

    constructor (private http: HttpClient) {}

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

    addTodo(title: string) {
        const todo: Todo = {_id: null, title: title, project: 'example project'};
        this.http.post<{message: string, todoId: string}>('http://localhost:3000/api/todos/', todo)
        .subscribe((responseData) => {
            const todoId = responseData.todoId;
            todo._id = todoId;
            this.todos.push(todo);
            this.todosUpdated.next([...this.todos]);
        });
    }

    updateTodo(id: string, title: string){
        const todo: Todo = {_id: id, title: title, project: 'example project'};
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