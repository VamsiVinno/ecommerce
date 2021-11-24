import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  clickedProduct!: number;
  // clickedProduct = new Subject<number>();
  cartLength = new BehaviorSubject<number>(0);
  constructor() {}
}
