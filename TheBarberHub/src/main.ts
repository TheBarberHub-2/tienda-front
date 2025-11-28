import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/paginas/aplicacion/app.config';
import { App } from './app/paginas/aplicacion/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
