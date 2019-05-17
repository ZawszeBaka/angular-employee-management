import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/authen/login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
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
