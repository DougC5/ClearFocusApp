import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

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

    getTodoUpdateListener() {
        return this.todosUpdated.asObservable();
    }

    addTodo(title: string) {
        const todo: Todo = {id: null, title: title};
        this.http.post<{message: string}>('http://localhost:3000/api/todos', todo)
        .subscribe((responseData) => {
            console.log(responseData);
            this.todos.push(todo);
            this.todosUpdated.next([...this.todos]);
        });
    }
}