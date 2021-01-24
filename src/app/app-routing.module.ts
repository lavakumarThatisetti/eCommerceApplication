import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './list-books/list-books.component';
import { RegisterComponent } from './register/register.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { YourOrdersComponent } from './your-orders/your-orders.component';

const routes:Routes=[
  {
    path:'cart',
    component: ViewCartComponent
  },
  {
    path:'list',
    component:ListBooksComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'yourOrders',
    component:YourOrdersComponent
  },
  {
    path:'',
    redirectTo:'/list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
