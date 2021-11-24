import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EcomServices } from 'src/app/ecom.services';
import { ProductModel } from 'src/app/shared/product.model';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderDetails!: ProductModel;
  orders: any;
  constructor(private ecom: EcomServices, private pagesService: PagesService) {}
  private subscription!: Subscription;
  private ordersSubscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.pagesService.orderClick.subscribe((res) => {
      this.orderDetails = res;
    });
    this.ordersSubscription = this.pagesService.orders.subscribe((res) => {
      this.orders = res;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }
}
