import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { dotenv } from 'dotenv';

if (environment.production) {
  enableProdMode();
} else {
  dotenv.load();
}

platformBrowserDynamic().bootstrapModule(AppModule);
