import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PageContentComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
