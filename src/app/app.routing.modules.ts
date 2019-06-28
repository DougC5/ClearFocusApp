import { EditPaneComponent } from './nav/edit-pane/edit-pane.component';
import { QtrComponent } from './calendar/qtr/qtr.component';
import { PurposeComponent } from './lists/purpose/purpose.component';
import { VisionComponent } from './lists/vision/vision.component';
import { ProjectsComponent } from './lists/projects/projects.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoListsComponent } from './lists/todo/todo-lists/todo-lists.component';
import { GoalsComponent } from './lists/goals/goals.component';
import { ReferenceComponent } from './lists/reference/reference.component';
import { TwoWeekComponent } from './calendar/two-week/two-week.component';
import { MonthComponent } from './calendar/month/month.component';
import { TodoComponent } from './lists/todo/todo.component';

const routes: Routes = [

    {path: '', component: TodoComponent},

    {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit'},

    {path: 'twoWeek', component: TwoWeekComponent},
    {path: 'month', component: MonthComponent},
    {path: 'qtr', component: QtrComponent},
    

    {path: 'projects', component: ProjectsComponent},
    {path: 'goals', component: GoalsComponent},
    {path: 'vision', component: VisionComponent},
    {path: 'purpose', component: PurposeComponent},
    {path: 'reference', component: ReferenceComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}