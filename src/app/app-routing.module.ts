import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'contacts',
    pathMatch: 'full',
    loadChildren: () =>
      import('./contact/contact.module').then((mod) => mod.ContactModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
