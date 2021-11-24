import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '../components.service';
import { BoysWear } from './boys.constant';
import { MENS_WEAR } from './men.constant';
import { MENS_BRANDS } from './menbrands.constant';
import { Price } from './price.constant';
import { WOMENS_WEAR } from './sidebar.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() selectedCategory: any;
  SubCategory: any = [];
  price = Price;
  kidsWear: any = BoysWear;
  boysWear: any = this.kidsWear.slice(0, 2);
  girlsWear = this.kidsWear.slice(2);
  mensWear = MENS_WEAR;
  womensWears = WOMENS_WEAR;
  menBrands = MENS_BRANDS;
  showBrands: boolean = false;
  brandsCategory: any = [];
  category?: string;
  priceRange: any = [];
  onCheck(event: Event, i: number) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.brandsCategory = [];
      console.log((event.target as HTMLInputElement).value);
      this.SubCategory.push((event.target as HTMLInputElement).value);
      if (this.category == 'men') {
        this.mensWear[i].enableChildren = true;
      } else if (this.category == 'women') {
        this.womensWears[i].enableChildren = true;
      } else if (this.category == 'kids') {
        this.kidsWear[i].enableChildren = true;
      }
      this.compService.fashionCategory.next(this.SubCategory);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.SubCategory.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (this.category == 'men') {
        this.mensWear[i].enableChildren = false;
      } else if (this.category == 'women') {
        this.womensWears[i].enableChildren = false;
      } else if (this.category == 'kids') {
        this.kidsWear[i].enableChildren = false;
      }
      this.SubCategory.splice(popedIndex, 1);
      this.compService.fashionCategory.next(this.SubCategory);
      this.brandsCategory = [];
    }
  }
  onBrand(event: Event) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.brandsCategory.push((event.target as HTMLInputElement).value);
      this.compService.brandsCategory.next(this.brandsCategory);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.brandsCategory.indexOf(
        (event.target as HTMLInputElement).value
      );
      this.brandsCategory.splice(popedIndex, 1);
      this.compService.brandsCategory.next(this.brandsCategory);
    }
  }
  onPrice(event: Event) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.priceRange.push((event.target as HTMLInputElement).value);
      this.compService.priceRange.next(this.priceRange);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.priceRange.indexOf(
        (event.target as HTMLInputElement).value
      );
      this.priceRange.splice(popedIndex, 1);
      this.compService.priceRange.next(this.priceRange);
    }
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(private compService: ComponentService) {}
  ngOnInit(): void {
    this.compService.category.subscribe((res: any) => {
      this.category = res;
      if (res == 'men' || 'women' || 'kids') {
        this.SubCategory = [];
      }
    });
    this.compService.fashionCategory.subscribe((res) => {
      if (res) {
        this.brandsCategory = [];
      }
    });
  }
}
