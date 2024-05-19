import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        return response.people || [];
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  createPerson(name: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.personUrl, JSON.stringify(name), { headers }).pipe(
      catchError(this.handleError<any>('createPerson'))
    );
  }

  updatePerson(person: Person): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.personUrl}/${person.personId}`, person, { headers }).pipe(
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  getAstronautDetail(personId: number): Observable<AstronautDetail | null> {
    return this.http.get<AstronautDetail>(`${this.personUrl}/AstronautDetail/${personId}`).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  getAstronautDuty(personId: number): Observable<AstronautDuty[] | null> {
    return this.http.get<AstronautDuty[]>(`${this.personUrl}/AstronautDuty/${personId}`).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
