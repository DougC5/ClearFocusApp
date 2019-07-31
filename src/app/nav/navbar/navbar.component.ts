import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { TodoService } from './../../lists/todo/todos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor( public todoService: TodoService, private authService: AuthService ) { }

  onCloseEditPane() {
    this.todoService.close();
  }

  ngOnInit() {
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authStatusSub = this.authService.getAuthStatusListener()
   .subscribe(isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
   });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
