import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';
import { SharedService } from 'src/app/shared/shared.services';
import { ComponentService } from '../components.service';
@Component({
  selector: 'app-product-layout',
  templateUrl: './product-layout.component.html',
  styleUrls: ['./product-layout.component.css'],
})
export class ProductLayoutComponent implements OnInit, OnChanges {
  productsArray: any;
  initialProducts: any;
  searchProduct: any;
  @Input() productCategory: any;
  @Input() kidsCategory: any;

  emptyArray: boolean = false;
  displayedProductsArray: any;
  onProduct(i: number) {
    this.shared.clickedProduct = i;
    localStorage.setItem(
      'clickedProduct',
      JSON.stringify(this.productsArray[i])
    );
  }
  constructor(
    private ecomService: EcomServices,
    private compService: ComponentService,
    private shared: SharedService
  ) {}

  ngOnChanges(): void {
    if (this.productCategory) {
      this.ecomService.categoryProducts(this.productCategory).subscribe({
        next: (res) => {
          this.productsArray = res;
          this.displayedProductsArray = this.productsArray;
        },
      });
    } else {
      this.ecomService.allProducts().subscribe((res: any) => {
        this.productsArray = res;
      });
    }
    this.compService.searchValue.subscribe((res) => {
      this.searchFilter(res);
    });
    if (this.productsArray == '') {
      this.emptyArray = true;
    } else {
      this.emptyArray = false;
    }
  }
  searchFilter(searchValue: string) {
    let filterData = this.searchProduct.filter((data: any) => {
      return data.brand.toLowerCase().includes(searchValue);
    });
    this.productsArray = filterData;
  }
  onSort(order: number) {
    let sorted;
    if (order == 1) {
      sorted = this.productsArray.sort((a: any, b: any) => {
        return a.price - b.price;
      });
    } else if (order == 0) {
      sorted = this.productsArray.sort((a: any, b: any) => {
        return b.price - a.price;
      });
    }
    this.productsArray = sorted;
  }

  ngOnInit(): void {
    let subCategory: any;
    this.ecomService.allProducts().subscribe((res) => {
      this.searchProduct = res;
      this.displayedProductsArray = res;
    });
    this.compService.fashionCategory.subscribe((cat: any) => {
      this.fashionFilterChange(this.productCategory, cat);
      subCategory = cat;
      if (cat.length < 1) {
        // if (this.productCategory == 'men') {
        //   this.ecomService.categoryProducts('men').subscribe((res) => {
        //     this.productsArray = res;
        //   });
        // } else if (this.productCategory == 'women') {
        //   this.ecomService.categoryProducts('women').subscribe((res) => {
        //     this.productsArray = res;
        //   });
        // } else if (this.productCategory == 'kids') {
        //   this.ecomService.categoryProducts('kids').subscribe((res) => {
        //     this.productsArray = res;
        //   });
        // }
        this.ecomService
          .categoryProducts(this.productCategory)
          .subscribe((res) => {
            this.productsArray = res;
          });
      }
      this.compService.brandsCategory.subscribe((brandcat: any) => {
        this.brandChange(this.productCategory, cat, brandcat);
        if (brandcat.length < 1) {
          this.fashionFilterChange(this.productCategory, cat);
          this.emptyArray = false;
        }
      });
    });
    this.compService.priceRange.subscribe((res: any) => {
      this.priceRange(res);
      if (res.length < 1 && this.productCategory && subCategory) {
        this.fashionFilterChange(this.productCategory, subCategory);
      } else if (res.length < 1 && this.productCategory) {
        this.ecomService
          .categoryProducts(this.productCategory)
          .subscribe((fscat: any) => {
            this.productsArray = fscat;
          });
      } else if (res.length < 1) {
        this.ecomService.allProducts().subscribe((res) => {
          this.productsArray = res;
        });
      }
    });
  }
  priceRange(range: string) {
    let pricRangeArray: any = [];

    for (let i = 0; i < range.length; i++) {
      switch (range[i]) {
        case '0-500':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price <= 500) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '500-1000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 500 && products.price <= 1000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '1000-2000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 1000 && products.price <= 2000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '2000-5000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 2000 && products.price <= 5000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '5000+': {
          this.displayedProductsArray.map((products: any) => {
            if (products.price > 5000) {
              pricRangeArray.push(products);
            }
          });
        }
      }
      console.log(pricRangeArray);

      this.productsArray = pricRangeArray;
    }
  }
  brandChange(mainCategory: string, fashionCategory: any, brand: string) {
    let brands: any = [];
    this.productsArray = [];
    for (let i = 0; i < fashionCategory.length; i++) {
      brands = [];
      for (let j = 0; j < brand.length; j++) {
        this.ecomService
          .brandCategory(mainCategory, fashionCategory[i], brand[j])
          .subscribe((res: any) => {
            brands.push(...res);
            this.productsArray = brands;
            if (this.productsArray == '') {
              this.emptyArray = true;
            } else {
              this.emptyArray = false;
            }
          });
      }
    }
  }
  fashionFilterChange(mainCategory: string, subCategory: string) {
    let fashionFilter: any = [];
    for (let i = 0; i < subCategory.length; i++) {
      this.ecomService
        .fashionCategory(mainCategory, subCategory[i])
        .subscribe((res: any) => {
          fashionFilter.push(...res);
          console.log(fashionFilter);
        });
    }
    this.productsArray = fashionFilter;
  }
}
