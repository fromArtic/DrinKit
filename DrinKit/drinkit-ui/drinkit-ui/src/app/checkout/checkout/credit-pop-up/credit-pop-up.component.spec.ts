import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPopUpComponent } from './credit-pop-up.component';

describe('CreditPopUpComponent', () => {

  let component: CreditPopUpComponent;
  let fixture: ComponentFixture<CreditPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditPopUpComponent]
    });
    fixture = TestBed.createComponent(CreditPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
