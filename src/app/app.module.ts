import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpTokenInterceptor } from './core/interceptors/http-token.interceptor';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './core/layout/layout-header/layout-header.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    // Components
    AppComponent,

    // My components
    LayoutHeaderComponent,
    
  ],
  imports: [
    // Modules
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,

    AppRoutingModule,

    // My modules
    CoreModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

