import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { LazyService } from './lazy.service';

export const lazyService = new InjectionToken<LazyService>('LazyService');

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: lazyService,
    useFactory: () => import('./lazy.service').then(m => m.LazyService)
  }],
})
export class AppModule {
  ngDoBootstrap() {
  }
}

bootstrapApplication(AppComponent);
