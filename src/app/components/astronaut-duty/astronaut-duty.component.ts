import { Component, OnInit } from '@angular/core';
import { AstronautDutyService, AstronautDuty } from '../../services/astronaut-duty.service';

@Component({
  selector: 'app-astronaut-duty',
  templateUrl: './astronaut-duty.component.html',
  styleUrls: ['./astronaut-duty.component.css']
})
export class AstronautDutyComponent implements OnInit {
  duties: AstronautDuty[] = [];

  constructor(private astronautDutyService: AstronautDutyService) { }

  ngOnInit(): void {
    this.astronautDutyService.getAstronautDuties().subscribe(data => {
      this.duties = data;
    });
  }
}
