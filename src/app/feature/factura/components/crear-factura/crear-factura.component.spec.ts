import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearFacturaComponent } from './crear-factura.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FacturaService } from '../../shared/service/factura.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CrearFacturaComponent', () => {
  let component: CrearFacturaComponent;
  let fixture: ComponentFixture<CrearFacturaComponent>;
  let facturaService: FacturaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFacturaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [FacturaService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);

    spyOn(facturaService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el formulario', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando esta vacio', () => {
    expect(component.facturaForm.valid).toBeFalsy();
  });

  it('Debe registrar una factura', () => {
    expect(component.facturaForm.valid).toBeFalsy();
    component.facturaForm.controls.placaFk.setValue('HHV18F');
    expect(component.facturaForm.valid).toBeTruthy();
    component.crear();
  });

  it('Debe mostrar mensaje de error ', (done) => {
    component.error("error");
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Error');
      Swal.clickConfirm();
      done();
    });
  });

  
  it('Debe mostrar mensaje de ¡GENIAL!', (done) => {
    setTimeout(() => {
      expect(component.facturaForm.valid).toBeFalsy();
      component.facturaForm.controls.placaFk.setValue('HHV18F');
      expect(component.facturaForm.valid).toBeTruthy();
      component.crear();
      expect(Swal.getTitle().textContent).toEqual('¡GENIAL!');
      Swal.clickConfirm();
      done();
    });
  });


});
