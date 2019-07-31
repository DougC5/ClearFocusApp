import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { Subject} from "rxjs";
import { MatSidenav } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

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
        };

    child = {
            ToDo: null,
            Projects: 'ToDo',
            Goals: 'Projects',
            Vision: 'Goals',
            Purpose: 'Vision',
        };

    constructor(private http: HttpClient, public authService: AuthService) { }

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


    public getParentType(key: string) {
        return this.parent[key];
    }

    public getChildType(key: string) {
        return this.child[key];
    }

    getParentTodosArray(){
        return [...this.todos.filter(p => p.type === this.getParentType(this.type))];
    }

    getChildTodosArray(){
        return [...this.todos.filter(p => p.type === this.getChildType(this.type))];
    }

    getTodos() {
        this.http.get<{message: string, todos: Todo[]}>('http://localhost:3000/api/todos')
        .subscribe((todoData) => {
         this.todos = todoData.todos;
         this.todosUpdated.next([...this.todos]);
        });
    }

    public getTodosByType(type: string){
        return [...this.todos.filter(p => p.type === type)];
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
            user: null,
            title: title,
            type: type,
            notes: null,
            project: null,
            children: null,
            parent: null,
            color: null,
            start: null,
            isScheduledCal: false,
            draggable: true,
            end: null,
            isFocus: false,
            resizable: {
                beforeStart: true,
                afterEnd: true
              },
        };
        this.http.post<{message: string, todoId: string}>('http://localhost:3000/api/todos/', todo)
        .subscribe((responseData) => {
            const todoId = responseData.todoId;
            todo._id = todoId;
            this.todos.push(todo);
            this.todosUpdated.next([...this.todos]);
        });
    }

    updateTodo(id: string, title: string, notes: string, type: string, parent: string, isScheduledCal: boolean, start: Date) {
        const todo: Todo = {
            _id: id, 
            title: title,
            type: type,
            notes: notes,
            project: null,
            children: null,
            parent: parent,
            isScheduledCal: isScheduledCal,
            color: null,
            start: start,
            draggable: true};
        this.http.put('http://localhost:3000/api/todos/' + id, todo)
        .subscribe(response => {
            const updatedTodos = [...this.todos];
            const oldTodoIndex = updatedTodos.findIndex(t => t._id === todo._id);
            updatedTodos[oldTodoIndex] = todo;
            this.todos = updatedTodos;
            this.todosUpdated.next([...this.todos]);
        });
    }

    updateCal(id: string, title: string, type: string, isScheduledCal: boolean, start: Date, end: Date ) {
        const todo: Todo = {
            _id: id,
            title: title,
            type: type,
            isScheduledCal: isScheduledCal,
            start: start,
            end: end
            };
        this.http.patch('http://localhost:3000/api/todos/' + id, todo)
        .subscribe(response => {
            const updatedTodos = [...this.todos];
            const oldTodoIndex = updatedTodos.findIndex(t => t._id === todo._id);
            updatedTodos[oldTodoIndex] = todo;
            this.todos = updatedTodos;
            this.todosUpdated.next([...this.todos]);
        });
    }

    updateFocus(id: string, title: string, type: string, start: Date, isScheduledCal: boolean, isFocus: boolean ) {
        const todo: Todo = {
            _id: id,
            title: title,
            type: type,
            start: start,
            isScheduledCal: isScheduledCal,
            isFocus: isFocus
    
            };
        this.http.patch('http://localhost:3000/api/todos/' + id, todo)
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