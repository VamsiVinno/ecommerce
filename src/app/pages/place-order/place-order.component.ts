import { Component, OnInit } from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  placeOrder?: string;
  address?: string;
  phone?: number;
  productId!: number;
  constructor(private ecom: EcomServices, private pagesService: PagesService) {}

  ngOnInit(): void {
    this.ecom
      .placeOrder(
        this.pagesService.productId,
        this.pagesService.address,
        this.pagesService.phone
      )
      .subscribe((res) => {
        this.placeOrder = res;
      });
  }
}
