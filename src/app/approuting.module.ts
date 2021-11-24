import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyNowComponent } from './pages/buynow/buynow.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ProductsComponent } from './pages/products/products.component';

const appRoutes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/homepage/homepage.component').then(
  //       (m) => m.HomepageComponent
  //     ),
  // },
  { path: '', component: HomepageComponent },
  // {
  //   path: 'cart',
  //   loadChildren: () =>
  //     import('./pages/cart/cart.component').then(
  //       (m) => m.CartComponent
  //     ),
  // },

  { path: 'cart', component: CartComponent },
  // {
  //   path: 'product',
  //   loadChildren: () =>
  //     import('./pages/products/products.component').then(
  //       (m) => m.ProductsComponent
  //     ),
  // },

  { path: 'product', component: ProductsComponent },
  // {
  //   path: 'buynow',
  //   loadChildren: () =>
  //     import('./pages/buynow/buynow.component').then(
  //       (m) => m.BuyNowComponent
  //     ),
  // },
  { path: 'buynow', component: BuyNowComponent },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/buynow/buynow.component').then(
  //       (m) => m.BuyNowComponent
  //     ),
  // },
  { path: 'orderplaced', component: PlaceOrderComponent },
  { path: 'allorders', component: OrderlistComponent },
  { path: 'orderdetails', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
