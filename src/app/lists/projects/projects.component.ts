import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/todos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  routeType: string;

  constructor(public todoService: TodoService, public route: ActivatedRoute) {
    
   }

  ngOnInit() {

    // this.route.url.subscribe((u) => {
    //   console.log("Projects COMPONENT ROUTE: ", this.route.snapshot);
    //   //this.routeType = this.route.snapshot.url[0].path;
      
    // });
    // this.todoService.setType(this.routeType);
  }

}
