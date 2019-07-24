// import { trackByWeekDayHeaderDate } from '../../../../node_modules/angular-calendar/modules/common/util';
import { colors } from './../cal-utils/colors';
import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/lists/todo/todo.model';
import { TodoService } from 'src/app/lists/todo/todos.service';
import { addMinutes } from 'date-fns';
 
@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(public todoService: TodoService) { }

   CalendarView = CalendarView;

  view = CalendarView.Week;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  refresh = new Subject<void>();
  todos: CalendarEvent[] = [];
  parent: Todo;
  isLoading = false;

  // function when event is dropped on calendar
  eventDropped({
    event,
    newStart,
    newEnd,
    allDay
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.todos.indexOf(event);
    console.log('event "changed": ', event);
    console.log('event "type of": ', event.start);
    console.log('event "END": ', event.end);
    event.isScheduledCal = true;
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.todos.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    event.end = newEnd;

    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }

    this.events = [...this.events];
    this.todoService.updateCal(event._id, event.title, event.type, event.isScheduledCal, event.start, event.end);
    console.log('events : ', this.events);
  }

  // Function for when event is removed from calendar
  externalDrop(event: CalendarEvent) {
    console.log('event "External Drop": ', event);
    if (this.todos.indexOf(event) === -1) {
      this.events = this.events.filter(iEvent => iEvent !== event);
      event.isScheduledCal = false;
      this.todos.push(event);
      this.todoService.updateCal(event._id, event.title, event.type, event.isScheduledCal, event.start, event.end);
      console.log('todos : ', this.todos);
    }
  }

  async ngOnInit() {

    this.isLoading = true;
    this.todos = await this.todoService.getTodosByType('ToDo');
    // Initalizing Date Objects
    this.todos.forEach(p => p.start = new Date(p.start));
    this.todos.forEach(p => p.end = addMinutes(new Date(p.end), 30));
    // Adding delete functionality to todos
    this.todos.forEach(p => p.actions = [
      {
        label: '<i class="fa fa-fw fa-times"></i>',
         onClick: ({ event }: { event: CalendarEvent }): void => {
           this.events = this.events.filter(iEvent => iEvent !== event);
           this.todoService.deleteTodo(event._id);
           console.log('Event deleted', event);
        }
      }
    ]);

    // Loading tasks to either "on calendar" or "off calendar" arrays
    this.events = this.todos.filter(p => p.isScheduledCal === true);
    this.todos = this.todos.filter(p => p.isScheduledCal === false);
    this.isLoading = false;

    console.log('todos array', this.todos);
    console.log('Events array', this.events);
  }

}
