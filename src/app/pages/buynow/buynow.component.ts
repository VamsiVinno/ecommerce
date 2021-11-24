import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomServices } from 'src/app/ecom.services';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
})
export class BuyNowComponent implements OnInit {
  product: any = localStorage.getItem('clickedProduct');
  productDetails: any = JSON.parse(this.product);
  address?: any;

  phone?: any;
  onFocusAddress(event: Event) {
    this.address = (event.target as HTMLInputElement).value;
  }
  onFocusPhone(event: Event) {
    this.phone = (event.target as HTMLInputElement).value;
  }
  onSubmitDebit() {
    this.ecom
      .placeOrder(this.productDetails.product_id, this.address, this.phone)
      .subscribe((res) => {
        this.pagesService.placeOrder.next(res);
      });
    this.router.navigate(['/orderplaced']);
  }

  onSubmitCredit() {
    this.ecom
      .placeOrder(this.productDetails.product_id, this.address, this.phone)
      .subscribe((res) => {
        this.pagesService.placeOrder.next(res);
      });
    this.router.navigate(['/orderplaced']);
  }
  onCash() {
    this.ecom
      .placeOrder(this.productDetails.product_id, this.address, this.phone)
      .subscribe((res) => {
        this.pagesService.placeOrder.next(res);
      });
    this.router.navigate(['/orderplaced']);
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private ecom: EcomServices,
    private pagesService: PagesService
  ) {}
  ngOnInit() {}
}
