import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/lists/todo/todos.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-small-bar',
  templateUrl: './small-bar.component.html',
  styleUrls: ['./small-bar.component.css']
})
export class SmallBarComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public todoService: TodoService, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
   .subscribe(isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
   });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }

}
