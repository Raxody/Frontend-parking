import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FacturaService } from './factura.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { FacturaCrear } from '../model/facturaCrear';
import { HttpResponse } from '@angular/common/http';
import { Factura } from '@factura/shared/model/factura';


describe('FacturaService', () => {
  let httpMock: HttpTestingController;
  let service: FacturaService;
  const apiEndpointFacturaConsulta = `${environment.endpoint}/listarFacturas`;
  const apiEndpointFactura = `${environment.endpoint}/facturaVariado/`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacturaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(FacturaService);
  });

  it('Deberia crearse', () => {
    const productService: FacturaService = TestBed.inject(FacturaService);
    expect(productService).toBeTruthy();
  });
    
  it('Deberia listar las facturas', () => {
    const dummyFacturas = [
      new Factura(1, '2022-04-19', 20, 'hhv18f', 158400.0), 
      new Factura(2, '2022-04-25', 3, 'MNU74D', 36000.0)
    ];
    service.consultar().subscribe(facturas => {
      expect(facturas.length).toBe(2);
      expect(facturas).toEqual(dummyFacturas);
    });
    const req = httpMock.expectOne(apiEndpointFacturaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFacturas);
  });


  it('Deberia guardar una factura', () => {
    const dummyFactura = new FacturaCrear('HHHV18D');
    service.guardar(dummyFactura).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointFactura}agregar`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });
  
  it('Deberia pagar una factura', () => {
    const dummyFacturas = new Factura(1, '2022-04-19', 20, 'hhv18f', 158400.0);
      service.pagar('hhv18f',dummyFacturas).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointFactura}calcular/hhv18f`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
