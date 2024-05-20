import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { AstronautDetailComponent } from './components/astronaut-detail/astronaut-detail.component';
import { AstronautDutyComponent } from './components/astronaut-duty/astronaut-duty.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    AstronautDetailComponent,
    AstronautDutyComponent,
    PersonDetailComponent,
    AddPersonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
