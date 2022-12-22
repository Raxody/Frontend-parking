import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FacturaService } from '@factura/shared/service/factura.service';
import { Factura } from '@factura/shared/model/factura';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {
  public listaFacturas: Observable<Factura[]>;

  constructor(protected facturaService: FacturaService) { }

  ngOnInit() {
    this.listaFacturas = this.facturaService.consultar();
  }

}
