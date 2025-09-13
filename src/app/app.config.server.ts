import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    // SSR disabled to avoid configuration issues
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
