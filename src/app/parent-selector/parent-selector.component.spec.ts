import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSelectorComponent } from './parent-selector.component';

describe('ParentSelectorComponent', () => {
  let component: ParentSelectorComponent;
  let fixture: ComponentFixture<ParentSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
