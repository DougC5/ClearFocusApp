import { AuthGuard } from './auth/login/auth.guard';
import { EditPaneComponent } from './nav/edit-pane/edit-pane.component';
import { QtrComponent } from './calendar/qtr/qtr.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MonthComponent } from './calendar/month/month.component';
import { TodoComponent } from './lists/todo/todo.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'ToDo',
        children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: 'month', component: MonthComponent, canActivate: [AuthGuard]},
    {path: 'qtr', component: QtrComponent, canActivate: [AuthGuard]},


    {path: 'Projects',
        children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: 'Goals',
    children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: 'Vision',
    children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: 'Purpose',
    children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: 'Reference',
    children: [
        {path: '', component: TodoComponent, canActivate: [AuthGuard]},
        {path: 'edit/:todoId', component: EditPaneComponent, outlet: 'sideEdit', canActivate: [AuthGuard]},
        ]},

    {path: "login", component: LoginComponent},

    {path: "signup", component: SignupComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]

})
export class AppRoutingModule {

}