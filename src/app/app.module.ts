import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductLayoutComponent } from './components/product-layout/product-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { AppRoutingModule } from './approuting.module';
import { BuyNowComponent } from './pages/buynow/buynow.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    ProductLayoutComponent,
    HomepageComponent,
    ProductsComponent,
    OrderlistComponent,
    CartComponent,
    BuyNowComponent,
    PlaceOrderComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
