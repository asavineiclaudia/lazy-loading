import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy',
  

  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss']
})
export class LazyComponent implements OnInit {
  ngOnInit(): void {
    console.log('LazyComponent has been loaded when scroll');
  }
}
