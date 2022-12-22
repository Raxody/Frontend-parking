import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../shared/service/factura.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Factura } from '@factura/shared/model/factura';

@Component({
  selector: 'app-pagar-factura',
  templateUrl: './pagar-factura.component.html',
  styleUrls: ['./pagar-factura.component.css']
})
export class PagarFacturaComponent implements OnInit {

  getPlacaFactura: string;
  listaFacturas: Observable<Factura[]>;
  valor : number;
  factura : Factura[];
  prueba : any;


  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  facturaFormPagar: FormGroup;
  constructor(protected facturaServices: FacturaService) {
    
  }

  ngOnInit() {
    this.construirFormularioFactura();  
  }

  exito(mensaje){
    this.notificacion.fire({
      title: '¡GENIAL!',
      text: mensaje ,
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

  cobrar() {
    this.getPlacaFactura = this.facturaFormPagar.get('placaFk').value;
    this.facturaServices.pagar(this.getPlacaFactura,this.facturaFormPagar.value).subscribe(
      data => {if (data){

      }},
      error => this.error(error.error.mensaje)
    );
    this.exito("Factura generada con exito, puedes consultar el valor en listar factura ");
  }

  private construirFormularioFactura() {
    this.facturaFormPagar = new FormGroup({
      placaFk: new FormControl('', [Validators.required]),        
      cantDias: new FormControl('', [Validators.required]), 
      });
      
  }

}
