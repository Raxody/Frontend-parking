import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../shared/service/factura.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  facturaForm: FormGroup;
  constructor(protected facturaServices: FacturaService) { }

  ngOnInit() {
    this.construirFormularioFactura();
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

  crear() {
    this.facturaServices.guardar(this.facturaForm.value).subscribe(
      data => {if (data){
        this.exito("Se ha creado la factura");
        this.facturaForm.reset();
      }},
      error => this.error(error.error.mensaje)
    );

  }

  private construirFormularioFactura() {
    this.facturaForm = new FormGroup({
      placaFk: new FormControl('', [Validators.required]),        
      });
      
  }



}
