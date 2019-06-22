import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtrComponent } from './qtr.component';

describe('QtrComponent', () => {
  let component: QtrComponent;
  let fixture: ComponentFixture<QtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
