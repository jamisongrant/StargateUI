import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AstronautDuty {
  id?: number;
  personId: number;
  dutyTitle: string;
  rank: string;
  dutyStartDate: Date;
  dutyEndDate?: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class AstronautDutyService {
  private apiUrl = 'https://localhost:7204/api/AstronautDuty';

  constructor(private http: HttpClient) { }

  getAstronautDuties(): Observable<AstronautDuty[]> {
    return this.http.get<AstronautDuty[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createAstronautDuty(duty: AstronautDuty): Observable<any> {
    return this.http.post<any>(this.apiUrl, duty)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error as needed
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
