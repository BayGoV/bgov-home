import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetupcardComponent } from './edit-meetupcard.component';

describe('EditMeetupcardComponent', () => {
  let component: EditMeetupcardComponent;
  let fixture: ComponentFixture<EditMeetupcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeetupcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeetupcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
