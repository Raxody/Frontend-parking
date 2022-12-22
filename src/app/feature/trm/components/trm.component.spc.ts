import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrmComponent } from './trm.component';


describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrmComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crearse', () => {
    expect(component).toBeTruthy();
    expect(component.spinner).toBeTrue();
  });


});