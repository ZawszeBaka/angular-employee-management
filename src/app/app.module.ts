import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* -----------------------------
      MODULES
--------------------------------*/
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

/* -----------------------------
      COMPONENTS
--------------------------------*/
// Main
import { AppComponent } from './app.component';

// Layout: header, footer, sidebar 
import { LayoutHeaderComponent } from './core/layout/layout-header/layout-header.component';


// Using MBD-Bootstrap to render 
import { MDBBootstrapModule } from 'angular-bootstrap-md';


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

    AppRoutingModule,

    // My modules
    CoreModule,

  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

