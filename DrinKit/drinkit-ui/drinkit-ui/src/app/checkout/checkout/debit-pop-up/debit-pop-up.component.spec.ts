import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitPopUpComponent } from './debit-pop-up.component';

describe('CheckoutPopUpComponent', () => {

  let component: DebitPopUpComponent;
  let fixture: ComponentFixture<DebitPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitPopUpComponent]
    });
    fixture = TestBed.createComponent(DebitPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
