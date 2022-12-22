import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-eliminar-vehiculo',
  templateUrl: './eliminar-vehiculo.component.html',
  styleUrls: ['./eliminar-vehiculo.component.css']
})
export class EliminarVehiculoComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  vehiculoEliminarForm: FormGroup;
  constructor(protected vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.construirFormularioFactura();
  }

  exito(mensaje) {
    this.notificacion.fire({
      title: 'Éxito',
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

  private construirFormularioFactura() {
    this.vehiculoEliminarForm = new FormGroup({
      placa: new FormControl('', [Validators.required]),
    });

  }



  eliminar() {
    this.notificacion.fire({
      title: '¿Desea eliminar el vehiculo junto a sus facturas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminar(this.vehiculoEliminarForm.get('placa').value).subscribe(
          data => {
            if (data) {

            }
          },
          error => this.error(error.error.mensaje)
        );
        this.exito("Vehiculo eliminado con exito");
        this.vehiculoEliminarForm.reset();
      }
    });
  }





}
