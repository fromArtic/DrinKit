import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkPopUpComponent } from './drink-pop-up.component';

describe('DrinkPopUpComponent', () => {

  let component: DrinkPopUpComponent;
  let fixture: ComponentFixture<DrinkPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrinkPopUpComponent]
    });
    fixture = TestBed.createComponent(DrinkPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
