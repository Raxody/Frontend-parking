import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { ListarVehiculoComponent } from './components/listar-vehiculo/listar-vehiculo.component';
import { EliminarVehiculoComponent } from './components/eliminar-vehiculo/eliminar-vehiculo.component';
import { ActualizarVehiculoComponent } from './components/actualizar-vehiculo/actualizar-vehiculo.component';
import { CrearVehiculoComponent} from './components/crear-vehiculo/crear-vehiculo.component';


const routes: Routes = [
    {
      path: '',
      component: VehiculoComponent,
      children: [
        {
          path: 'listar',
          component: ListarVehiculoComponent
        },
        {
          path: 'eliminar',
          component: EliminarVehiculoComponent
        },
        {
          path: 'actualizar',
          component: ActualizarVehiculoComponent
        },
        {
          path: 'crear',
          component: CrearVehiculoComponent
        },
    ]
  }
];

  



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VehiculoRoutingModule { }
  
  