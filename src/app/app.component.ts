import { TodoService } from './lists/todo/todos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('editDrawer') public sidenav: MatSidenav;

  constructor(public todoService: TodoService){   }

  nav = true;
  editPane: boolean;

  navToggle() {
    if (this.nav) {
      this.nav = false;
    } else {
      this.nav = true;
    }
  }

  toggleEdit() {
    this.sidenav.toggle();
    // this.todoService.toggleEditPane(this.editPane);
  }

  ngOnInit(){
    this.todoService.setSidenav(this.sidenav);
    };

}
