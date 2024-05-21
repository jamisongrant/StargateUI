import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AstronautDetail {
  id?: number;
  personId: number;
  currentDutyTitle: string;
  currentRank: string;
  careerStartDate: Date | null;
  careerEndDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class AstronautDetailService {
  private apiUrl = 'https://localhost:7204/api/AstronautDetail';

  constructor(private http: HttpClient) { }

  getAstronautDetails(): Observable<AstronautDetail[]> {
    return this.http.get<AstronautDetail[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createAstronautDetail(detail: AstronautDetail): Observable<any> {
    return this.http.post<any>(this.apiUrl, detail)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error as needed
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
