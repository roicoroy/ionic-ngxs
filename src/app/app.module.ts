import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './states/todo.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { WaiterState } from './states/waiter.state';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { PointsState } from './states/point.state';

@NgModule({
  declarations: [
    AppComponent,
    // WaiterFormComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([
      // TodoState,
      PointsState,
      WaiterState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot({
      // eslint-disable-next-line no-underscore-dangle
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
