import { Component, OnInit } from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  category?: any;

  fashionCategory: any;
  onCategory(event: Event) {
    this.category = event;
  }
  onFashionCategory(event: Event) {
    this.fashionCategory = event;
  }

  constructor(private ecom: EcomServices) {}

  ngOnInit(): void {}
}
