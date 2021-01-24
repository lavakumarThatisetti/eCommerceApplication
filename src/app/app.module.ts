import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckinService } from './service/checkin.service';
import { BooksFilterPipe } from './filters/books-filter.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterComponent } from './register/register.component';
import { YourOrdersComponent } from './your-orders/your-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksFilterPipe,
    ListBooksComponent,
    ViewCartComponent,
    RegisterComponent,
    YourOrdersComponent,
    HttpClientModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule
  ],
  providers: [CheckinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
