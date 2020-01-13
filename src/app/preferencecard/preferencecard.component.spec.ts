import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencecardComponent } from './preferencecard.component';

describe('PreferencecardComponent', () => {
  let component: PreferencecardComponent;
  let fixture: ComponentFixture<PreferencecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
