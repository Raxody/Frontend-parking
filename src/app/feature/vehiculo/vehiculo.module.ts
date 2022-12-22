import { NgModule } from '@angular/core';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { SharedModule } from '@shared/shared.module';
import { ListarVehiculoComponent } from './components/listar-vehiculo/listar-vehiculo.component';
import { EliminarVehiculoComponent } from './components/eliminar-vehiculo/eliminar-vehiculo.component';
import { ActualizarVehiculoComponent } from './components/actualizar-vehiculo/actualizar-vehiculo.component';
import { CrearVehiculoComponent} from './components/crear-vehiculo/crear-vehiculo.component';
import { VehiculoService } from './shared/service/vehiculo.service';


@NgModule({
  declarations: [
    VehiculoComponent,
    ListarVehiculoComponent,
    EliminarVehiculoComponent,
    ActualizarVehiculoComponent,
    CrearVehiculoComponent
  ],
  imports: [
    VehiculoRoutingModule,
    SharedModule
  ],
  providers: [VehiculoService]
})

export class VehiculoModule { }

