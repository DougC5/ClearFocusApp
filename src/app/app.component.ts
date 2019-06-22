import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nav = true;

  navToggle() {
    if (this.nav) {
      this.nav = false;
    } else {
      this.nav = true;
    }
  }

}
