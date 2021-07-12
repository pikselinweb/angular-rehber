import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// AUTH GUARD EKLENDI
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // ROUTER KONTROL
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
