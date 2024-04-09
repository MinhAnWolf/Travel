import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripDetailComponent } from './my-trip-detail.component';

describe('MyTripDetailComponent', () => {
  let component: MyTripDetailComponent;
  let fixture: ComponentFixture<MyTripDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTripDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyTripDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
