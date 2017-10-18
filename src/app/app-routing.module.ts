import { NotificationsComponent } from './content/notifications/notifications.component';
import { ProfileComponent } from './content/users/profile/profile.component';
import { EditUserComponent } from './content/users/edit-user/edit-user.component';
import { AdminGuard } from './series/guards/admin.guard';
import { EditorGuard } from './series/guards/editor.guard';
import { NotfoundComponent } from './content/notfound/notfound.component';
import { AddUserComponent } from './content/users/add-user/add-user.component';
import { UsersComponent } from './content/users/users.component';
import { AuthGuard } from './series/guards/auth.guard';
import { CalendarComponent } from './content/calendar/calendar.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { LoginComponent } from './content/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component : LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'calendar',
    component: CalendarComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'users',
    component : UsersComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'users/add',
    component : AddUserComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'users/edit/:$key',
    component: EditUserComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'users/profile/:$key',
    component : ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'notifications',
    component: NotificationsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
