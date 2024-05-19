import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../../services/person.service';
import { AstronautDetailService, AstronautDetail } from '../../services/astronaut-detail.service';
import { AstronautDutyService, AstronautDuty } from '../../services/astronaut-duty.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person | null = null;
  astronautDetail: AstronautDetail | null = null;
  newPerson: Person = {
    personId: 0,
    name: '',
    currentRank: '',
    currentDutyTitle: '',
    careerStartDate: null,
    careerEndDate: null
  };
  addingPerson: boolean = false;
  editing: { [key: number]: boolean } = {};

  constructor(
    private personService: PersonService,
    private astronautDetailService: AstronautDetailService,
    private astronautDutyService: AstronautDutyService
  ) { }

  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.personService.getPeople()
      .subscribe(people => this.people = people.slice(0, 100));
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.fetchAstronautDetail(person.personId);
  }

  fetchAstronautDetail(personId: number): void {
    this.astronautDetailService.getAstronautDetails()
      .subscribe(details => {
        this.astronautDetail = details.find(detail => detail.personid === personId) || null;
      });
  }

  startEdit(personId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering row selection
    this.editing[personId] = true;
  }

  saveEdit(person: Person, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering row selection
    this.editing[person.personId] = false;
    this.personService.updatePerson(person)
      .subscribe(() => this.fetchPeople());
  }

  addPerson(): void {
    this.addingPerson = true;
  }

  saveNewPerson(): void {
    this.personService.createPerson(this.newPerson.name)
      .subscribe(() => {
        this.newPerson = {
          personId: 0,
          name: '',
          currentRank: '',
          currentDutyTitle: '',
          careerStartDate: null,
          careerEndDate: null
        };
        this.addingPerson = false;
        this.fetchPeople();
      });
  }

  cancelAddPerson(): void {
    this.addingPerson = false;
    this.newPerson = {
      personId: 0,
      name: '',
      currentRank: '',
      currentDutyTitle: '',
      careerStartDate: null,
      careerEndDate: null
    };
  }
}
