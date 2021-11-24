import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';
import { SharedService } from 'src/app/shared/shared.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  clickedPorductIndex!: number;
  product!: any;
  clickedProduct: any = localStorage.getItem('clickedProduct');
  productDetails: productModel = JSON.parse(this.clickedProduct);
  totalCount?: number;
  onAddBag() {
    return this.httpclient
      .post(
        'http://192.168.0.12:3005/api/addToCart',
        {
          productId: this.productDetails.product_id,
          productCount: 1,
        },
        {
          responseType: 'text',
        }
      )
      .subscribe((res) => {
        this.ecomService.cart().subscribe((res: any) => {
          console.log(res);

          this.totalCount = res.reduce((acc: number, ele: any) => {
            return acc + ele.product_count;
          }, 0);
          localStorage.setItem('cartlength', JSON.stringify(this.totalCount));
        });
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your item is added to cart',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  constructor(
    private ecomService: EcomServices,
    private shared: SharedService,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    // this.ecomService.allProducts().subscribe((res: any) => {
    //   this.clickedPorductIndex = this.shared.clickedProduct;
    //   console.log(res[this.clickedPorductIndex]);
    //   // this.productDetails = res[this.clickedPorductIndex];
    // });
  }
  ngOnChanges(): void {}
}
type productModel = {
  id?: number;
  product_id?: number;
  product_name?: string;
  brand?: string;
  price?: number;
  gender?: string;
  images?: Array<any>;
  createdAt?: string;
  updatedAt?: string;
};
