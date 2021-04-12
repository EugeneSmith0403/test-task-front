import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from './common/guards/logout/logout.guard';
import { AuthGuard } from './common/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LogoutGuard],

  },
  {
    path: '',
    loadChildren: () => import('./workspace/workspace.module').then(m => m.WorkspaceModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
