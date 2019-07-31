import { AuthService } from 'src/app/auth/auth.service';
import { TodoService } from './lists/todo/todos.service';
import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('editDrawer') public sidenav: MatSidenav;

  //ATTEMPT TO GET THE OUTSIDE CLICK TO CLOSE THE EDIT PANE

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (this.eRef.nativeElement.contains(event.target) && event.target.className !== "mat-drawer-inner-container" && event.target.localName !== 'mat-icon') {
  //     console.log("click outside: ", this.eRef)
  //     this.sidenav.close();
  //   } else {
  //     console.log("else: ", this.eRef)
  //     return
  //   }
  // }

  constructor(public todoService: TodoService, private eRef: ElementRef, private AuthService: AuthService){ }

  nav = true;
  editPane: boolean;


  close() {
    this.sidenav.close();
  }

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

  ngOnInit() {
    this.todoService.setSidenav(this.sidenav);
    this.AuthService.autoAuthUser();

    };

}
