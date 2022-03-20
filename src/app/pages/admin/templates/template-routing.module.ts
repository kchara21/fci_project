import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';



const routes: Routes = [
  { path: '', component: TemplateComponent },
  {
    path: 'template',
    loadChildren: () =>
      import('./template.module').then((m) => m.TemplateModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
