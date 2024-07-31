import { Component, ComponentRef, Injector, ViewChild, ViewContainerRef } from '@angular/core';

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
  constructor(private injector: Injector) {}


  loadLazyModule() {
    import('./lazy-module.module').then(m => {
      console.log('Lazy Module loaded:', m);
    }).catch(err => console.error('Lazy Module load error', err));
  }

  

  async loadLazyService() {
    try {
      const { LazyService } = await import('./lazy.service');
      const lazyServiceInjector = Injector.create({
        providers: [{ provide: LazyService, useClass: LazyService }],
        parent: this.injector
      });

      const lazyServiceInstance = lazyServiceInjector.get(LazyService);
      lazyServiceInstance.doSomething();
    } catch (err) {
      console.error('Error loading LazyService:', err);
    }
  }

  loadAboutComponentDynamically() {
    import('../app/about/about.component').then(({ AboutComponent }) => {
      const componentRef: ComponentRef<any> = this.dynamicComponentContainer.createComponent(AboutComponent);
      console.log('Lazy component loaded:', componentRef);
    }).catch(err => console.error('Lazy component load error', err));
  }
  }

 
