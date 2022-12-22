import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { FacturaCrear } from '../model/facturaCrear';
import { Factura } from '../model/factura';


@Injectable()
export class FacturaService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Factura[]>(`${environment.endpoint}/listarFacturas`, this.http.optsName('consultar facturas'));
  }

  public guardar(factura: FacturaCrear) {
    return this.http.doPost<FacturaCrear, boolean>(`${environment.endpoint}/facturaVariado/agregar`, factura,
                                                this.http.optsName('crear facuta'));
  }

  public pagar(placaFk:string,factura: Factura){
    return this.http.doUpdate(`${environment.endpoint}/facturaVariado/calcular/${placaFk}`,factura,
                                                  this.http.optsName('pagar facuta'));
  }


}
