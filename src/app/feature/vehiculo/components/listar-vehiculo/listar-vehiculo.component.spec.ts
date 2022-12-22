import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarVehiculoComponent } from './listar-vehiculo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VehiculoService } from '../../shared/service/vehiculo.service';
import { VehiculoActualizar } from '@vehiculo/shared/model/vehiculoActualizar';
import { HttpService } from 'src/app/core/services/http.service';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('ListarVehiculoComponent', () => {
  let component: ListarVehiculoComponent;
  let fixture: ComponentFixture<ListarVehiculoComponent>;
  let vehiculoService: VehiculoService;
  const listaVehiculos: VehiculoActualizar[] = [new VehiculoActualizar('hhv18f', 10004963,3152546969),
  new VehiculoActualizar('hhv18f', 100049634,31525468811)];

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVehiculoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [VehiculoService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculoService);
    spyOn(vehiculoService, 'consultar').and.returnValue(
      of(listaVehiculos)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el formulario', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia listar correctamente y mostrar que trae dos vehiculos', () => {

    expect(component).toBeTruthy();
    component.listaVehiculos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

});
  