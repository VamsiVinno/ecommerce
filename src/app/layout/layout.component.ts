import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showOptions: any;
  onShowOptions(event: Event) {
    this.showOptions = event;
  }

  constructor() {}
  ngOnInit(): void {}
}
