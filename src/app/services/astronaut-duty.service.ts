import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AstronautDuty {
  name: string;
  rank: string;
  dutyTitle: string;
  dutyStartDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AstronautDutyService {
  private apiUrl = 'https://localhost:7204/api/astronaut-duty';  // Update this URL if needed

  constructor(private http: HttpClient) { }

  getAstronautDuties(): Observable<AstronautDuty[]> {
    return this.http.get<AstronautDuty[]>(this.apiUrl);
  }
}
