import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [

  
  {
    path:'',
    loadChildren:()=>
    import('./pages/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'login',
    loadChildren:()=>
    import('./pages/auth/auth.module').then(m=>m.AuthModule),
    canActivate:[CheckLoginGuard],
  }
  ,
  {
    path:'admin',
    loadChildren:()=>
    import('./pages/admin/admin.module').then(m=>m.AdminModule)
  },{
    path:'**',
    redirectTo:'',
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
