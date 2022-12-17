import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from "./order/order.component";
import {ProductdetailComponent} from "./productdetail/productdetail.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {SucessOrderComponent} from "./sucess-order/sucess-order.component";


const routes: Routes = [
  {path: '', component: OrderComponent},
  // {path: 'search/:searchItem', component: HomeComponent},
  {path:'item/:id', component: ProductdetailComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'RefreshComponent', component: CheckoutComponent},
  {path: 'successorder', component: SucessOrderComponent},



  // {path: 'sucessorder', component: SuccessorderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
