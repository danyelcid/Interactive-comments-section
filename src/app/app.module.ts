import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';

import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import  localEs  from "@angular/common/locales/es-MX";

registerLocaleData(localEs);

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


// importar rutas
import { ROUTES } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    RouterModule.forRoot( ROUTES, {useHash: true} ),
    ModalModule.forRoot()
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es_Mx'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {  }
}
