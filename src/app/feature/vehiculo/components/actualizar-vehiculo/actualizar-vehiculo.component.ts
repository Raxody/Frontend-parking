import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiculoActualizar } from '@vehiculo/shared/model/vehiculoActualizar';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-vehiculo',
  templateUrl: './actualizar-vehiculo.component.html',
  styleUrls: ['./actualizar-vehiculo.component.css']
})
export class ActualizarVehiculoComponent implements OnInit {

  vehiculo: VehiculoActualizar[];
  buscarBotonEstado = false;
  vehiculoFormActualizar: FormGroup;

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });


  constructor(protected vehiculoService: VehiculoService) { 

  }

  ngOnInit() {
    this.vehiculoService.consultar().subscribe(
      (vehiculos => this.vehiculo = vehiculos)
    );
    this.construirFormularioVehiculo();
  }

  buscar() {
    let existeVehiculo = 0;
    for (var i = 0; i < this.vehiculo.length; i++) {
      if (this.vehiculo[i].placa == this.vehiculoFormActualizar.get('placa').value) {
        this.vehiculoFormActualizar.controls['identificacion'].setValue(this.vehiculo[i].idPropietario);
        this.vehiculoFormActualizar.controls['telefonoContacto'].setValue(this.vehiculo[i].telefonoContacto);
        existeVehiculo = 1;
      }
    }
    if(existeVehiculo == 0){
      this.error("Vehiculo no encontrado");
    }
  }


  public onSubmit(): void {
    if (this.buscarBotonEstado) {
      this.buscar();
    } else {
      this.actualizar();     
    }

  }

  public botonBuscar(): void {
    this.buscarBotonEstado = true;
  }

  public botonActualizar(): void {
    this.buscarBotonEstado = false;
  }

  
  exito(mensaje) {
    this.notificacion.fire({
      title: '¡GENIAL!',
      text: mensaje,
      icon: 'success'
    });
  }


  error(mensaje) {
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }

  actualizar() {
    this.vehiculoService.actualizar(this.vehiculoFormActualizar.get('placa').value, this.vehiculoFormActualizar.value).subscribe(
      data => {
        if (data) {
        }
      },
      error => this.error(error.error.mensaje)
    );
    this.exito("Vehiculo actualizado correctamente");
  }

  private construirFormularioVehiculo() {
    this.vehiculoFormActualizar = new FormGroup({
      placa: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      telefonoContacto: new FormControl('', [Validators.required])
    });

  }


}
