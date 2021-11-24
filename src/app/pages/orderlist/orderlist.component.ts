import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomServices } from 'src/app/ecom.services';
import { ProductModel } from 'src/app/shared/product.model';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  constructor(
    private ecom: EcomServices,
    private pagesService: PagesService,
    private route: Router
  ) {}
  allOrdersArray: ProductModel[] = [];
  orders: any;
  onOrderClick(i: number) {
    console.log(this.allOrdersArray[i]);
    // this.pagesService.orderClick.next(i);
    // this.route.navigate(['orderdetails']);

    this.pagesService.clickedOrder(this.allOrdersArray[i]);
    this.pagesService.orders.next(this.orders[i]);
    this.route.navigate(['orderdetails']);
  }
  ngOnInit(): void {
    this.ecom.allOrders().subscribe((res: any) => {
      this.orders = res;
      this.ecom.allProducts().subscribe((prodres: any) => {
        res.forEach((element: any) => {
          prodres.forEach((prod: any) => {
            if (prod.product_id === element.product_id) {
              this.allOrdersArray?.push(prod);
            }
          });
        });
      });
    });
  }
}
