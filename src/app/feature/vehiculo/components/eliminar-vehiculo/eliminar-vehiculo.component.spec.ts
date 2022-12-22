import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EliminarVehiculoComponent } from './eliminar-vehiculo.component';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {  CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

describe('BorrarVehiculoComponent', () => {
  let component: EliminarVehiculoComponent;
  let fixture: ComponentFixture<EliminarVehiculoComponent>;
  let vehiculoService: VehiculoService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarVehiculoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [VehiculoService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarVehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculoService);
    spyOn(vehiculoService, 'eliminar').and.returnValue(
     of( true )
    );
    fixture.detectChanges();
  });

  it('Deberia crearse', () => {
    expect(component).toBeTruthy();
  });

  
  it('Deberia borrar un vehiculo', (done) => {
    expect(component.vehiculoEliminarForm.valid).toBeFalsy();
    component.vehiculoEliminarForm.controls.placa.setValue('HHHV18D');
    expect(component.vehiculoEliminarForm.valid).toBeTruthy();
    expect(component.vehiculoEliminarForm).not.toBeNull();

    component.eliminar();
    component.exito("Vehiculo eliminado con exito");

    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual("Éxito");
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

  it('Debe mostrar mensaje de exito ', (done) => {
    component.exito("Vehiculo eliminado con exito");
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual("Éxito");
      Swal.clickConfirm();
      done();
    });
  });

});