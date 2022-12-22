import { NgModule } from '@angular/core';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListarFacturaComponent } from './components/listar-factura/listar-factura.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { SharedModule } from '@shared/shared.module';
import { FacturaService } from './shared/service/factura.service';
import { PagarFacturaComponent } from './components/pagar-factura/pagar-factura.component';


@NgModule({
  declarations: [
    CrearFacturaComponent,
    ListarFacturaComponent,
    FacturaComponent,
    PagarFacturaComponent
  ],
  imports: [
    FacturaRoutingModule,
    SharedModule
  ],
  providers: [FacturaService]
})
export class FacturaModule { }
