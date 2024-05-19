import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Person {
  personId: number;
  name: string;
  currentRank: string;
  currentDutyTitle: string;
  careerStartDate: Date | null;
  careerEndDate: Date | null;
}

export interface AstronautDetail {
  personId: number;
  currentDutyTitle: string;
  currentRank: string;
  careerStartDate: Date | null;
}

export interface AstronautDuty {
  name: string;
  rank: string;
  dutyTitle: string;
  dutyStartDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = '/api/Person/People';  // For fetching all people
  private personUrl = '/api/Person';      // Base URL for fetching a single person
  private astronautDetailUrl = '/api/AstronautDetail'; // Base URL for fetching astronaut details
  private astronautDutyUrl = '/api/AstronautDuty'; // Base URL for fetching astronaut duties

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Extract the people array from the response
        return response.people || [];
      }),
      catchError(() => {
        // Handle errors by returning an empty array
        return of([]);
      })
    );
  }

  getPersonByName(name: string): Observable<Person | null> {
    return this.http.get<any>(`${this.personUrl}/${name}`).pipe(
      map(response => {
        // Extract the person object from the response
        return response.person || null;
      }),
      catchError(() => {
        // Handle errors by returning null
        return of(null);
      })
    );
  }

  getAstronautDetail(personId: number): Observable<AstronautDetail | null> {
    return this.http.get<AstronautDetail>(`${this.astronautDetailUrl}/${personId}`).pipe(
      catchError(() => {
        // Handle errors by returning null
        return of(null);
      })
    );
  }

  getAstronautDuty(personId: number): Observable<AstronautDuty[] | null> {
    return this.http.get<AstronautDuty[]>(`${this.astronautDutyUrl}/${personId}`).pipe(
      catchError(() => {
        // Handle errors by returning null
        return of(null);
      })
    );
  }
}
