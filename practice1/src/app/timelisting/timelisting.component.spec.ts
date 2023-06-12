import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelistingComponent } from './timelisting.component';

describe('TimelistingComponent', () => {
  let component: TimelistingComponent;
  let fixture: ComponentFixture<TimelistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelistingComponent]
    });
    fixture = TestBed.createComponent(TimelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
