import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { AstronautDetailComponent } from './components/astronaut-detail/astronaut-detail.component';
import { AstronautDutyComponent } from './components/astronaut-duty/astronaut-duty.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    AstronautDetailComponent,
    AstronautDutyComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
