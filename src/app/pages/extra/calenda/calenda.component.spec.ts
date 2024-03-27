import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendaComponent } from './calenda.component';

describe('CalendaComponent', () => {
  let component: CalendaComponent;
  let fixture: ComponentFixture<CalendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
