import { Component, ComponentRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LazyService } from './lazy.service';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
[x: string]: any;
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
    import('../app/about/about.component').then(({ AboutComponent }) => {
      const componentRef: ComponentRef<any> = this.dynamicComponentContainer.createComponent(AboutComponent);
      console.log('Lazy component loaded:', componentRef);
    }).catch(err => console.error('Lazy component load error', err));
  }
  }

 
