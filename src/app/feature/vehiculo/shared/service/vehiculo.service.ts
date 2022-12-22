import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Vehiculo } from '../model/vehiculo';
import { VehiculoActualizar } from '../model/vehiculoActualizar';


@Injectable()
export class VehiculoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<VehiculoActualizar[]>(`${environment.endpoint}/listarVehiculo`, this.http.optsName('consultar vehiculos'));
  }

  public guardar(vehiculo: Vehiculo) {
    return this.http.doPost<Vehiculo, boolean>(`${environment.endpoint}/vehiculoVariado/agregar`, vehiculo,
                                                this.http.optsName('crear vehiculo'));
  }

  public actualizar(placa: string,vehiculo: Vehiculo){
    return this.http.doUpdate(`${environment.endpoint}/vehiculoVariado/actualizar/${placa}`,vehiculo,
                                                  this.http.optsName('actualizar vehiculo'));
  }

  public eliminar(placa: string) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/vehiculoVariado/borrar/${placa}`,
                                                 this.http.optsName('eliminar vehiculo'));
  }

}
