import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { AstronautDetailComponent } from './components/astronaut-detail/astronaut-detail.component';
import { AstronautDutyComponent } from './components/astronaut-duty/astronaut-duty.component';

const routes: Routes = [
  { path: '', redirectTo: '/person-list', pathMatch: 'full' },
  { path: 'person-list', component: PersonListComponent },
  { path: 'astronaut-detail', component: AstronautDetailComponent },
  { path: 'astronaut-duty', component: AstronautDutyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
