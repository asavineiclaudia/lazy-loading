import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LazyService } from './lazy.service';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lazy-loading';

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;

  constructor(@Inject(LazyService) private lazyService: LazyService) {}


  loadLazyModule() {
    import('./lazy-module.module').then(m => {
      console.log('Lazy Module loaded:', m);
    }).catch(err => console.error('Lazy Module load error', err));
  }

  loadLazyService() {
    this.lazyService.doSomething();
  }

  loadAboutComponentDynamically() {
    this.lazyService.loadComponent(AboutComponent, this.dynamicComponentContainer);
  }
}
