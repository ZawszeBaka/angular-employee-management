import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/authen/login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
  },
  {
    path: 'features',
    loadChildren: './pages/features/features.module#FeaturesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules // preload all modules; optionally we could implement a custom preloading strategy for just someof the modules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
