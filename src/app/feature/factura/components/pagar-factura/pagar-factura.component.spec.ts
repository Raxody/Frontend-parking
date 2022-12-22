import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { PagarFacturaComponent } from './pagar-factura.component';

describe('PagarFacturaComponent', () => {
  let component: PagarFacturaComponent;
  let fixture: ComponentFixture<PagarFacturaComponent>;
  let usuarioService: FacturaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PagarFacturaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FacturaService, HttpService],
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PagarFacturaComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(FacturaService);
    fixture.detectChanges();
  });

  it('Deberia crear el formulario', () => {
    expect(component).toBeTruthy();
  });


  it('Deberia generar el pago de la factura', () => {

    spyOn(usuarioService, 'pagar').and.returnValue(
      of(true)
    );

    expect(component.facturaFormPagar.valid).toBeFalsy();
    component.facturaFormPagar.controls.placaFk.setValue('HHHV18D');
    component.facturaFormPagar.controls.cantDias.setValue(8);
    expect(component.facturaFormPagar.valid).toBeTruthy();
    expect(component.facturaFormPagar).not.toBeNull();
    expect(component.facturaFormPagar.valid).toBeTruthy();

    component.cobrar();
  });

  it('Deberia generar el pago de la factura con error', () => {

    spyOn(usuarioService, 'pagar').and.returnValue(
      of(null)
    );

    expect(component.facturaFormPagar.valid).toBeFalsy();
    component.facturaFormPagar.controls.placaFk.setValue('HHHV18D');
    component.facturaFormPagar.controls.cantDias.setValue(8);
    expect(component.facturaFormPagar.valid).toBeTruthy();
    expect(component.facturaFormPagar).not.toBeNull();
    expect(component.facturaFormPagar.valid).toBeTruthy();

    component.cobrar();

  });

  it('Debe mostrar mensaje de ¡GENIAL!', (done) => {
    component.exito("Factura generada con exito, puedes consultar el valor en listar factura ");
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('¡GENIAL!');
      Swal.clickConfirm();
      done();
    });
  });


  it('Debe mostrar mensaje de error ', (done) => {
    component.error("error");
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Error');
      Swal.clickConfirm();
      done();
    });
  });


});