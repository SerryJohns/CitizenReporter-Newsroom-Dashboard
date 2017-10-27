import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PushNotificationsComponent } from './../components/push-notifications/push-notifications.component';
import { AssignmentsComponent } from './../components/assignments/assignments.component';
import { PageContentComponent } from '../components/page-content/page-content.component';
import { StoriesComponent } from '../components/stories/stories.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'analytics',  component: AnalyticsComponent },
  {
    path: 'home',  component: PageContentComponent, data: {
    title: 'Overview'
  } },
  { path: 'stories',  component: StoriesComponent, data: {
    title: 'Stories'
  } },
  { path: 'push-notifications', component: PushNotificationsComponent, data: {
    title: 'Notifications'
  } },
  { path: 'assignments', component: AssignmentsComponent , data: {
    title: 'Assignments'
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
