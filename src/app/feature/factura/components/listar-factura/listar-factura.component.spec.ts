import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarFacturaComponent } from './listar-factura.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FacturaService } from '../../shared/service/factura.service';
import { Factura } from '@factura/shared/model/factura';
import { HttpService } from 'src/app/core/services/http.service';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('ListarFacturaComponent', () => {
  let component: ListarFacturaComponent;
  let fixture: ComponentFixture<ListarFacturaComponent>;
  let facturaService: FacturaService;
  const listaFactura: Factura[] = [new Factura(1, '2022-04-19', 20, 'hhv18f', 158400.0),
  new Factura(2, '2022-04-25', 3, 'MNU74D', 36000.0)];

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarFacturaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [FacturaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFacturaComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);
    spyOn(facturaService, 'consultar').and.returnValue(
      of(listaFactura)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el formulario', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia listar correctamente y mostrar que trae dos facturas', () => {

    expect(component).toBeTruthy();
    component.listaFacturas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

});
  