import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PageContentComponent } from './../components/page-content/page-content.component';
import { StoriesComponent } from './../components/stories/stories.component';
import { PushNotificationsComponent } from './../components/push-notifications/push-notifications.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: PageContentComponent },
  { path: 'stories',  component: StoriesComponent },
  { path: 'push-notifications', component: PushNotificationsComponent }
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
