import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'contacts',
    pathMatch: 'full',
    loadChildren: () =>
      import('./contact/contact.module').then((mod) => mod.ContacteModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    redirectTo: '/home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
