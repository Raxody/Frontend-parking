import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearVehiculoComponent } from './crear-vehiculo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CrearFacturaComponent', () => {
  let component: CrearVehiculoComponent;
  let fixture: ComponentFixture<CrearVehiculoComponent>;
  let vehiculoService: VehiculoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVehiculoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [VehiculoService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculoService);

    spyOn(vehiculoService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el formulario', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando esta vacio', () => {
    expect(component.vehiculoForm.valid).toBeFalsy();
  });

  it('Debe registrar un vehiculo', () => {
    expect(component.vehiculoForm.valid).toBeFalsy();
    component.vehiculoForm.controls.placa.setValue('HHV18F');
    component.vehiculoForm.controls.identificacion.setValue(10004825);
    component.vehiculoForm.controls.telefonoContacto.setValue(3152546585);
    expect(component.vehiculoForm.valid).toBeTruthy();
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
      expect(component.vehiculoForm.valid).toBeFalsy();
      component.vehiculoForm.controls.placa.setValue('HHV18F');
      component.vehiculoForm.controls.identificacion.setValue(10004825);
      component.vehiculoForm.controls.telefonoContacto.setValue(3152546585);
      expect(component.vehiculoForm.valid).toBeTruthy();
      component.crear();
      expect(Swal.getTitle().textContent).toEqual('¡GENIAL!');
      Swal.clickConfirm();
      done();
    });
  });


});
