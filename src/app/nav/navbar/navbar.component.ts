import { TodoService } from './../../lists/todo/todos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public todoService: TodoService) { }

  onCloseEditPane() {
    this.todoService.close();
  }

  ngOnInit() {
  }

}
