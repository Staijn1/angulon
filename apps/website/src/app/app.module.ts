import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './main/app/app.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';
import {NavigationbarComponent} from './main/navigationbar/navigationbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ledstripStateReducer} from '../redux/ledstrip/ledstrip.reducer';
import {modesReducer} from '../redux/modes/modes.reducer';
import {gradientsReducer} from '../redux/gradients/gradients.reducer';
import {userPreferencesReducer} from '../redux/user-preferences/user-preferences.reducer';
import {ChromaConnection} from "./services/chroma-sdk/ChromaConnection";
import {RestChromaConnectionService} from "./services/chroma-sdk/rest-chroma-connection.service";

const StoreDevtools = StoreDevtoolsModule.instrument();
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      ledstripState: ledstripStateReducer,
      modes: modesReducer,
      gradients: gradientsReducer,
      userPreferences: userPreferencesReducer
    }),
    StoreDevtools,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    })
  ],
  declarations: [
    AppComponent,
    NavigationbarComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ChromaConnection,
      useClass: RestChromaConnectionService
    }
  ]
})
export class AppModule {
}
