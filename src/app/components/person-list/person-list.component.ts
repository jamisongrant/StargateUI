import { Component, OnInit } from '@angular/core';
import { PersonService, Person, AstronautDetail, AstronautDuty } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person | null = null;
  astronautDetail: AstronautDetail | null = null;
  astronautDuties: AstronautDuty[] | null = null;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.personService.getPeople().subscribe(data => {
      this.people = data;
    });
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.fetchAstronautDetail(person.personId);
    this.fetchAstronautDuties(person.personId);
  }

  fetchAstronautDetail(personId: number): void {
    this.personService.getAstronautDetail(personId).subscribe(data => {
      this.astronautDetail = data;
    });
  }

  fetchAstronautDuties(personId: number): void {
    this.personService.getAstronautDuty(personId).subscribe(data => {
      this.astronautDuties = data;
    });
  }
}
