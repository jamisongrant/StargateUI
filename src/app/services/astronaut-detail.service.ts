import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AstronautDetail {
  personid: number;
  currentDutyTitle: string;
  currentRank: string;
  careerStartDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AstronautDetailService {
  private apiUrl = 'https://localhost:7204/api/astronaut-detail';  // Update this URL if needed

  constructor(private http: HttpClient) { }

  getAstronautDetails(): Observable<AstronautDetail[]> {
    return this.http.get<AstronautDetail[]>(this.apiUrl);
  }
}
