import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { AstronautDetailComponent } from './components/astronaut-detail/astronaut-detail.component';
import { AstronautDutyComponent } from './components/astronaut-duty/astronaut-duty.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { AddPersonComponent } from './components/add-person/add-person.component';

const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'person-detail/:name', component: PersonDetailComponent },
  { path: 'astronaut-detail/:personId', component: AstronautDetailComponent },
  { path: 'astronaut-duty/:personId', component: AstronautDutyComponent },
  { path: 'add-person', component: AddPersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
