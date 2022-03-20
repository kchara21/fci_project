import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('./templates/template.module').then((m) => m.TemplateModule),
  },

 
  { 
    path: 'parameters', 
    loadChildren: () => import('./parameters/parameters.module').then(m => m.ParametersModule)
  },
  { 
    path: 'pools', 
    loadChildren: () => import('./pools/pools.module').then(m => m.PoolsModule)
  },
  { 
    path: 'reports', 
    loadChildren: () => import('./reports-pool/reports-pool.module').then(m => m.ReportsPoolModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
