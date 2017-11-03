import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryMediaComponent } from './components/story-media/story-media.component';
import { PushNotificationsComponent } from './components/push-notifications/push-notifications.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { ParseConfig } from './services/parse-config';
import { FilterPipe } from './pipes/filter.pipe';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { EventsAnalyticsComponent } from './components/events-analytics/events-analytics.component';
import { CircularSpinnerComponent } from './components/circular-spinner/circular-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PageContentComponent,
    PageHeaderComponent,
    StoriesComponent,
    StoryMediaComponent,
    PushNotificationsComponent,
    FilterPipe,
    AssignmentsComponent,
    CreateAssignmentComponent,
    AnalyticsComponent,
    AnalyticsComponent,
    VerticalBarChartComponent,
    PieChartComponent,
    LineChartComponent,
    EventsAnalyticsComponent,
    CircularSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [ ParseConfig ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


