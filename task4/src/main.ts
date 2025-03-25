import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';

registerLocaleData(localeIn);

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: 'en-IN' }],
})
export class AppModule { }

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));