import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  doSomething() {
    console.log('Lazy Service did something!');
  }


  loadComponent(component: any, containerRef: ViewContainerRef) {
    containerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = containerRef.createComponent(componentFactory);

    return componentRef;
  }
}

