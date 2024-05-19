import { Component, OnInit } from '@angular/core';
import { AstronautDetailService, AstronautDetail } from '../../services/astronaut-detail.service';

@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.component.html',
  styleUrls: ['./astronaut-detail.component.css']
})
export class AstronautDetailComponent implements OnInit {
  details: AstronautDetail[] = [];

  constructor(private astronautDetailService: AstronautDetailService) { }

  ngOnInit(): void {
    this.astronautDetailService.getAstronautDetails().subscribe(data => {
      this.details = data;
    });
  }
}
