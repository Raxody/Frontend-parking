import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { VehiculoActualizar } from '@vehiculo/shared/model/vehiculoActualizar';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrls: ['./listar-vehiculo.component.css']
})
export class ListarVehiculoComponent implements OnInit {

  public listaVehiculos : Observable<VehiculoActualizar[]>;

  constructor(protected vehiculoService : VehiculoService) { }

  ngOnInit(): void {
    this.listaVehiculos = this.vehiculoService.consultar();

  }

}
