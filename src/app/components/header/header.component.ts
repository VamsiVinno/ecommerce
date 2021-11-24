import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';
import { SharedService } from 'src/app/shared/shared.services';
import { ComponentService } from '../components.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Output() category = new EventEmitter();
  selectedCategory?: any;
  kidsCategory = false;
  searchValue?: string = '';

  clickedProduct: any = localStorage.getItem('cartlength');
  cartLength?: any = JSON.parse(this.clickedProduct);
  onCategory(event: Event) {
    this.selectedCategory = this.category.emit(
      (event.target as HTMLInputElement).textContent?.toLowerCase()
    );
    this.componentService.category.next(
      (event.target as HTMLInputElement).textContent?.toLowerCase()
    );
  }
  onSearch(event: Event) {
    this.componentService.searchValue.next(
      (event.target as HTMLInputElement).value
    );
  }
  onSearchValue() {
    let search = (document.getElementById('search') as HTMLInputElement).value;
    this.componentService.searchValue.next(search);
  }
  constructor(
    private ecomService: EcomServices,
    private componentService: ComponentService,
    private shared: SharedService
  ) {}
  ngOnChanges(): void {}
  ngOnInit(): void {}
}
