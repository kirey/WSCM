import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AppRoutes } from './app.routes';

// Components
import { HomeComponent } from './home/home.component';
import { NestoComponent } from './nesto/nesto.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NestoComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
