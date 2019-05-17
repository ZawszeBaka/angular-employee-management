import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';

import { ShowAuthedDirective } from './directives/show-authed.directive';

@NgModule({
  imports: [
    // Module
    LayoutModule,
    CommonModule
  ],
  declarations: [
    // Components
    ShowAuthedDirective
    
  ],
  exports: [
    ShowAuthedDirective
  ]
})
export class CoreModule { }
