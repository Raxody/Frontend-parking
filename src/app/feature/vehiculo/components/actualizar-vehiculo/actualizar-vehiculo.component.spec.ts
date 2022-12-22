import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { VehiculoActualizar } from '@vehiculo/shared/model/vehiculoActualizar';
import { HttpService } from '@core/services/http.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

//import { Vehiculo } from '@vehiculo/shared/model/vehiculo';
import { ActualizarVehiculoComponent } from './actualizar-vehiculo.component';



describe('ActualizarArticuloComponent', () => {
  let component: ActualizarVehiculoComponent;
  let fixture: ComponentFixture<ActualizarVehiculoComponent>;
  let vehiculoService: VehiculoService;
  const listaVehiculo: VehiculoActualizar[] = [new VehiculoActualizar('hhv18f', 10004963,3152546969), new VehiculoActualizar('jjb14d', 100043,3152541169)];


  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    await TestBed.configureTestingModule({

        declarations: [ ActualizarVehiculoComponent ],
        imports: [
          CommonModule,
          HttpClientModule,
          ReactiveFormsModule,          
          RouterTestingModule,
          FormsModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
        providers: [VehiculoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarVehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculoService);
  
    fixture.detectChanges();
  });

  it('Debe crear un componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe consultar información del vehiculo pero no encontrarlo', (done) => {

      spyOn(vehiculoService, 'consultar').and.returnValue(
        of( listaVehiculo )
      );
      expect(component.vehiculoFormActualizar.valid).toBeFalsy();
      component.ngOnInit();
      component.vehiculoFormActualizar.controls.placa.setValue('hhvd18f');
      component.buscar();
      expect(component.vehiculoFormActualizar.valid).toBeFalse();
      setTimeout(() => {
        expect(Swal.getTitle().textContent).toEqual('Error');
        Swal.clickConfirm();
        done();
      });
  });

  it('Debe consultar información del vehiculo y encontrarlo', () => {

    spyOn(vehiculoService, 'consultar').and.returnValue(
      of( listaVehiculo )
    );
    expect(component.vehiculoFormActualizar.valid).toBeFalsy();
    component.ngOnInit();
    component.vehiculoFormActualizar.controls.placa.setValue('hhv18f');
    component.buscar();
    expect(component.vehiculoFormActualizar.valid).toBeTruthy();
});


  it('Debe actualizar los datos del vehiculo', () => {
    spyOn(vehiculoService, 'actualizar').and.returnValue(
      of(true)
    );

    expect(component.vehiculoFormActualizar.valid).toBeFalsy();
    component.vehiculoFormActualizar.controls.placa.setValue('hhv18f');
    component.vehiculoFormActualizar.controls.identificacion.setValue(101234);
    component.vehiculoFormActualizar.controls.telefonoContacto.setValue(317233377);
    
    expect(component.vehiculoFormActualizar.valid).toBeTruthy();

    component.actualizar();

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
