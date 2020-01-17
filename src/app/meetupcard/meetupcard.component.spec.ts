import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupcardComponent } from './meetupcard.component';

describe('MeetupcardComponent', () => {
  let component: MeetupcardComponent;
  let fixture: ComponentFixture<MeetupcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
