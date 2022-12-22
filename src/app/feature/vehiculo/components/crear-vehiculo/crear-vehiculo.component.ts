import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  vehiculoForm: FormGroup;
  constructor(protected vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.construirFormularioVehiculo();
  }


  crear() {
    this.vehiculoService.guardar(this.vehiculoForm.value).subscribe(
      data => {if (data){
        this.vehiculoForm.reset();
        this.exito("Se ha creado el vehiculo");
      }},
      error => this.error(error.error.mensaje)
    );
  }

  private construirFormularioVehiculo() {
    this.vehiculoForm = new FormGroup({
      placa: new FormControl('', [Validators.required]),        
      identificacion: new FormControl('', [Validators.required]),        
      telefonoContacto: new FormControl('', [Validators.required])    
      });
      
  }

  exito(mensaje){
    this.notificacion.fire({
      title: '¡GENIAL!',
      text: mensaje,
      icon: 'success'
    });
  }


  error(mensaje){
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }

}
