import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('anchor') anchor: ElementRef;

  @ViewChild('lazyAnchor', { static: true }) lazyAnchor: any;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;

  private intersectionObserver: IntersectionObserver;
  private isHomeComponentLoaded = false;

  constructor() {}

  ngOnInit(): void {
    console.log('Componenta About a fost încărcată!');
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadLazyComponent();
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    });

    this.intersectionObserver.observe(this.lazyAnchor.nativeElement);
  }

  loadLazyComponent() {
    import('../lazy/lazy.component').then(({ LazyComponent }) => {
      const componentRef: ComponentRef<any> = this.dynamicComponentContainer.createComponent(LazyComponent);
      console.log('Lazy component loaded:', componentRef);
    }).catch(err => console.error('Lazy component load error', err));
  }


  loadHomeComponent() {
    if (!this.isHomeComponentLoaded) {
      import('../home/home.component').then(({ HomeComponent }) => {
        const componentRef = this.dynamicComponentContainer.createComponent(HomeComponent);
        console.log('Home component loaded:', componentRef);
        this.isHomeComponentLoaded = true;
      }).catch(err => console.error('Home component load error', err));
    }
  }
}
