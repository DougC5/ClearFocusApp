import { AuthInterceptor } from './auth/auth-interceptor';
import { SignupComponent } from './auth/signup/signup.component';
import { CountPipe } from './count.pipe';
import { AppRoutingModule } from './app.routing.modules';
import { HeaderComponent } from './nav/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TodoComponent } from './lists/todo/todo.component';
import { MonthComponent } from './calendar/month/month.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { TodoListsComponent } from './lists/todo/todo-lists/todo-lists.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatTableModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatChipsModule,
  MatBadgeModule,} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QtrComponent } from './calendar/qtr/qtr.component';
import { SmallBarComponent } from './nav/small-bar/small-bar.component';
import { EditPaneComponent, EditPaneNotesDialog } from './nav/edit-pane/edit-pane.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarHeaderComponent } from './calendar/cal-utils/calendar-header.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './auth/login/login.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    MonthComponent,
    NavbarComponent,
    HeaderComponent,
    TodoListsComponent,
    QtrComponent,
    SmallBarComponent,
    EditPaneComponent,
    CalendarHeaderComponent,
    EditPaneNotesDialog,
    CountPipe,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],

  entryComponents: [EditPaneNotesDialog, ErrorComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    [
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ],
    DragAndDropModule,
    CalendarModule,
    CommonModule,
    DragDropModule


  ],

  exports: [ EditPaneNotesDialog ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
