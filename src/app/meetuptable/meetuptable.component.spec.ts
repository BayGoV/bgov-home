import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetuptableComponent } from './meetuptable.component';

describe('MeetuptableComponent', () => {
  let component: MeetuptableComponent;
  let fixture: ComponentFixture<MeetuptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetuptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetuptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
