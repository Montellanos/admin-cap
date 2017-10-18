import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { LoginComponent } from './content/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { CalendarComponent } from './content/calendar/calendar.component';
import { AuthGuard } from './series/guards/auth.guard';
import { UsersComponent } from './content/users/users.component';
import { UsersService } from './series/services/users.service';
import { AddUserComponent } from './content/users/add-user/add-user.component';
import { NotfoundComponent } from './content/notfound/notfound.component';
import { RoleformatPipe } from './series/pipes/roleformat.pipe';
import { EditorGuard } from './series/guards/editor.guard';
import { AuthService } from './series/services/auth.service';
import { AdminGuard } from './series/guards/admin.guard';
import { RolenameformatPipe } from './series/pipes/rolenameformat.pipe';

import { EditUserComponent } from './content/users/edit-user/edit-user.component';
import { MomentModule } from 'angular2-moment';
import { ProfileComponent } from './content/users/profile/profile.component';
import { NotificationsComponent } from './content/notifications/notifications.component';
import { NotificationsService } from './series/services/notifications.service';

const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAwh5xWgPTdBxjWvalxGbftTzl3KiJc8WM',
    authDomain: 'application-cap.firebaseapp.com',
    databaseURL: 'https://application-cap.firebaseio.com',
    projectId: 'application-cap',
    storageBucket: 'application-cap.appspot.com',
    messagingSenderId: '983418984510'
  }
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CalendarComponent,
    UsersComponent,
    AddUserComponent,
    NotfoundComponent,
    RoleformatPipe,
    RolenameformatPipe,
    EditUserComponent,
    ProfileComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    HttpModule
  ],
  providers: [AuthGuard, UsersService, EditorGuard, AuthService, AdminGuard, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
