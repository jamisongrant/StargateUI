import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../../services/person.service';
import { AstronautDetailService, AstronautDetail } from '../../services/astronaut-detail.service';
import { AstronautDutyService, AstronautDuty } from '../../services/astronaut-duty.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person | null = null;
  astronautDetails: AstronautDetail[] = [];
  selectedPersonIndex: number | null = null;
  newPerson: Person = {
    personId: 0,
    name: '',
    currentRank: '',
    currentDutyTitle: '',
    careerStartDate: null,
    careerEndDate: null
  };
  newAstronautDetail: AstronautDetail = {
    personId: 0,
    currentDutyTitle: '',
    currentRank: '',
    careerStartDate: null,
    careerEndDate: null
  };
  newAstronautDuty: AstronautDuty = {
    personId: 0,
    dutyTitle: '',
    rank: '',
    dutyStartDate: new Date(),
    dutyEndDate: null
  };
  addingPerson: boolean = false;
  addingDetail: boolean = false;
  addingDuty: boolean = false;
  editing: { [key: number]: boolean } = {};
  imageCache: { [key: number]: string } = {};
  errorMessage: string | null = null;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

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
      .subscribe(people => {
        this.totalItems = people.length;
        this.people = people.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      });
  }

  selectPerson(person: Person, index: number): void {
    if (this.selectedPersonIndex === index) {
      // Deselect if the same person is clicked again
      this.selectedPersonIndex = null;
      this.selectedPerson = null;
      this.astronautDetails = [];
    } else {
      this.selectedPerson = person;
      this.selectedPersonIndex = index;
      this.fetchAstronautDetail(person.personId);
    }
  }

  fetchAstronautDetail(personId: number): void {
    this.astronautDetailService.getAstronautDetails()
      .subscribe(details => {
        this.astronautDetails = details.filter(detail => detail.personId === personId);
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

  cancelEdit(personId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering row selection
    this.editing[personId] = false;
  }

  addPerson(): void {
    this.addingPerson = true;
  }

  saveNewPerson(): void {
    if (this.newPerson.name === '' || this.newPerson.currentRank === '' || this.newPerson.currentDutyTitle === '' || this.newPerson.careerStartDate === null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.personService.createPerson(this.newPerson.name)
      .subscribe(
        () => {
          this.newPerson = {
            personId: 0,
            name: '',
            currentRank: '',
            currentDutyTitle: '',
            careerStartDate: null,
            careerEndDate: null
          };
          this.addingPerson = false;
          this.errorMessage = null;
          this.fetchPeople();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `Error: ${error.message}`;
        }
      );
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
    this.errorMessage = null;
  }

  addAstronautDuty(): void {
    if (!this.selectedPerson) {
      this.errorMessage = 'Please select a person first';
      return;
    }
    if (this.newAstronautDuty.dutyTitle === '' || this.newAstronautDuty.rank === '' || this.newAstronautDuty.dutyStartDate === null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.newAstronautDuty.personId = this.selectedPerson.personId;
    this.astronautDutyService.createAstronautDuty(this.newAstronautDuty)
      .subscribe(
        () => {
          this.newAstronautDuty = {
            personId: 0,
            dutyTitle: '',
            rank: '',
            dutyStartDate: new Date(),
            dutyEndDate: null
          };
          this.addingDuty = false;
          this.errorMessage = null;
          this.fetchAstronautDetail(this.selectedPerson!.personId); // Refresh details
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `Error: ${error.message}`;
        }
      );
  }

  cancelAddDuty(): void {
    this.addingDuty = false;
    this.newAstronautDuty = {
      personId: 0,
      dutyTitle: '',
      rank: '',
      dutyStartDate: new Date(),
      dutyEndDate: null
    };
    this.errorMessage = null;
  }

  addAstronautDetail(): void {
    if (!this.selectedPerson) {
      this.errorMessage = 'Please select a person first';
      return;
    }
    if (this.newAstronautDetail.currentDutyTitle === '' || this.newAstronautDetail.currentRank === '' || this.newAstronautDetail.careerStartDate === null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.newAstronautDetail.personId = this.selectedPerson.personId;
    this.astronautDetailService.createAstronautDetail(this.newAstronautDetail)
      .subscribe(
        () => {
          this.newAstronautDetail = {
            personId: 0,
            currentDutyTitle: '',
            currentRank: '',
            careerStartDate: null,
            careerEndDate: null
          };
          this.addingDetail = false;
          this.errorMessage = null;
          this.fetchAstronautDetail(this.selectedPerson!.personId); // Refresh details
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `Error: ${error.message}`;
        }
      );
  }

  cancelAddDetail(): void {
    this.addingDetail = false;
    this.newAstronautDetail = {
      personId: 0,
      currentDutyTitle: '',
      currentRank: '',
      careerStartDate: null,
      careerEndDate: null
    };
    this.errorMessage = null;
  }

  getRandomImage(personId: number): string {
    if (!this.imageCache[personId]) {
      this.imageCache[personId] = `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`;
    }
    return this.imageCache[personId];
  }

  // Pagination methods
  changePage(page: number): void {
    this.currentPage = page;
    this.fetchPeople();
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
