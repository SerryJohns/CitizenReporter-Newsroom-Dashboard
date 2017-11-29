import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { EventsAnalyticsComponent } from '../components/events-analytics/events-analytics.component';
import { PageContentComponent } from '../components/page-content/page-content.component';
import { StoriesComponent } from '../components/stories/stories.component';
import { PushNotificationsComponent } from '../components/push-notifications/push-notifications.component';
import { AssignmentsComponent } from '../components/assignments/assignments.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guards/authentication/authentication.guard';
import { UserAccountComponent } from '../components/user-account/user-account.component';
import { UsersComponent } from '../components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/analytics', pathMatch: 'full' },
  { path: 'analytics',  component: AnalyticsComponent, canActivate: [ AuthGuard ] },
  { path: 'profile',  component: ProfileComponent, canActivate: [ AuthGuard ] },
  {
    path: 'home',  component: PageContentComponent, data: {
    title: 'Overview'
  }, canActivate: [ AuthGuard ] },
  { path: 'stories',  component: StoriesComponent, data: {
    title: 'Stories'
  }, canActivate: [ AuthGuard ] },
  { path: 'push-notifications', component: PushNotificationsComponent, data: {
    title: 'Notifications'
  }, canActivate: [ AuthGuard ] },
  { path: 'assignments', component: AssignmentsComponent , data: {
    title: 'Assignments'
  }, canActivate: [ AuthGuard ]  },
  { path: 'events-summary',  component: EventsAnalyticsComponent, canActivate: [ AuthGuard ] },
  { path: 'create-account', component: UserAccountComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent , data: {
    title: 'Login'
  } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
