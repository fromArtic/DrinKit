import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryUuidComponent } from './recovery-uuid.component';

describe('RecoveryUuidComponent', () => {
  
  let component: RecoveryUuidComponent;
  let fixture: ComponentFixture<RecoveryUuidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryUuidComponent]
    });
    fixture = TestBed.createComponent(RecoveryUuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
