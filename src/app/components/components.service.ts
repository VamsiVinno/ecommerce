import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  fashionCategory = new Subject<[]>();
  brandsCategory = new Subject<[]>();
  searchValue = new Subject<string>();
  category = new BehaviorSubject<any>('');
  priceRange = new Subject<[]>();
  constructor() {}
}
