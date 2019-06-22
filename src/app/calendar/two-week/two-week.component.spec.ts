import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWeekComponent } from './two-week.component';

describe('TwoWeekComponent', () => {
  let component: TwoWeekComponent;
  let fixture: ComponentFixture<TwoWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
