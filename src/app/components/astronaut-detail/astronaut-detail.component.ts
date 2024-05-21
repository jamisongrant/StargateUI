import { Component, OnInit } from '@angular/core';
import { AstronautDetailService, AstronautDetail } from '../../services/astronaut-detail.service';
import { AstronautDutyService, AstronautDuty } from '../../services/astronaut-duty.service';
import { PersonService, Person } from '../../services/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.component.html',
  styleUrls: ['./astronaut-detail.component.css']
})
export class AstronautDetailComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person | null = null;
  astronautDetail: AstronautDetail | null = null;
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
  addingDetail: boolean = false;
  addingDuty: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private astronautDetailService: AstronautDetailService,
    private astronautDutyService: AstronautDutyService,
    private personService: PersonService
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
        this.astronautDetail = details.find(detail => detail.personId === personId) || null;
      });
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
}
