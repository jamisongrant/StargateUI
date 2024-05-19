import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautDetailComponent } from './astronaut-detail.component';

describe('AstronautDetailComponent', () => {
  let component: AstronautDetailComponent;
  let fixture: ComponentFixture<AstronautDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AstronautDetailComponent]
    });
    fixture = TestBed.createComponent(AstronautDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
