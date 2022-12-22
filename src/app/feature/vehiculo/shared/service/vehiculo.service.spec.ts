import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VehiculoService } from './vehiculo.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Vehiculo } from '../model/vehiculo';
import { VehiculoActualizar } from '../model/vehiculoActualizar';
import { HttpResponse } from '@angular/common/http';

describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let vehiculoService: VehiculoService;
  const apiEndpointVehiculoConsulta = `${environment.endpoint}/listarVehiculo`;
  const apiEndpointVehiculo = `${environment.endpoint}/vehiculoVariado/`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    vehiculoService = TestBed.inject(VehiculoService);
  });

  it('Deberia crearse', () => {
    const vehiculoService: VehiculoService = TestBed.inject(VehiculoService);
    expect(vehiculoService).toBeTruthy();
  });

  it('Deberia listar los vehiculos', () => {
    const dummyUsuarios = [
      new VehiculoActualizar('hhv18f', 10004963,3152546969),
      new VehiculoActualizar('mnu74d', 10004841,3152547474)
    ];
    vehiculoService.consultar().subscribe(vehiculos => {
      expect(vehiculos.length).toBe(2);
      expect(vehiculos).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(apiEndpointVehiculoConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('Deberia crear un vehiculo', () => {
    const dummyVehiculos = new Vehiculo('hhv18f', 10004963,3152546969);
    vehiculoService.guardar(dummyVehiculos).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointVehiculo}agregar`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia actualizar un vehiculo', () => {
    const dummyVehiculos = new Vehiculo('hhv18f', 10004963,3152546969);
    vehiculoService.actualizar("hhv18f",dummyVehiculos).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointVehiculo}actualizar/hhv18f`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia eliminar un vehiculo', () => {
    const dummyVehiculos = 'hhv18f'
    vehiculoService.eliminar(dummyVehiculos).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointVehiculo}borrar/hhv18f`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});