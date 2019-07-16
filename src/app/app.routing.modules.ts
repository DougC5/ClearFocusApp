import { EditPaneComponent } from './nav/edit-pane/edit-pane.component';
import { QtrComponent } from './calendar/qtr/qtr.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TwoWeekComponent } from './calendar/two-week/two-week.component';
import { MonthComponent } from './calendar/month/month.component';
import { TodoComponent } from './lists/todo/todo.component';


const routes: Routes = [

    
    {path: '', redirectTo: 'ToDo', pathMatch: 'full' },
    {path: 'ToDo',
        children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]
},

    // {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},

    {path: 'twoWeek', component: TwoWeekComponent},
    {path: 'month', component: MonthComponent},
    {path: 'qtr', component: QtrComponent},
    

    {path: 'Projects',
        children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]},

    {path: 'Goals',
    children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]},

    {path: 'Vision',
    children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]},

    {path: 'Purpose',
    children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]},

    {path: 'Reference',
    children: [
        {path: '', component: TodoComponent},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},
        ]},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}