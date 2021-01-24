import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Books } from 'src/models/Books';
import { CheckinService } from '../service/checkin.service';

import { UsersService } from '../service/users.service';
import { Order } from 'src/models/Order';
import { PaymentsService } from '../service/payments.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  booksOnCart: Books[];
  order = new Order(0,0,"",0,0,"");
  Math = Math;
  totalSum:any=0;
  totalItems:any=0;
  users : any;
  emaild:String;
  constructor(private checkinservice:CheckinService,
    private router:Router,
    private userService:UsersService ,
    private paymentService:PaymentsService) { }

  ngOnInit(): void {
    this.booksOnCart=[];
    for (var i = 0; i < localStorage.length; i++){
      if( localStorage.key(i)!="user_token"
       && localStorage.key(i)!="transactionDetails"
       &&  localStorage.key(i)!="OrderedBooks"){
        console.log(localStorage.getItem(localStorage.key(i)));
        var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
        this.booksOnCart.push(json);
        this.totalSum = this.totalSum+json['price']
      }
    }
    this.totalItems =  this.booksOnCart.length;
    this.emaild = localStorage.getItem("user_token")
  }
  buy(book:Books){
    console.log("Sucessfully buy the book");
    console.log("Your Book Details");
    console.log(book.title)
    console.log(book.authors)
    console.log(book.isbn)
    console.log(book.average_rating)
    console.log(book.price)
  }
  removeFromCart(book){
    localStorage.removeItem(book.bookID)
    const index: number = this.booksOnCart.indexOf(book);
    if (index !== -1) {
        this.booksOnCart.splice(index, 1);
    } 
    this.totalItems = this.booksOnCart.length;
    this.totalSum = this.totalSum - book.price
    alert("Item Removed sucessfully From Cart")
  }
  buyAll(){
    alert("Total "+this.totalItems+" Items Selected")
    if(localStorage.getItem("user_token")==null){
      this.router.navigateByUrl("/register");
    }
    var bookIds=[];
    for (var i = 0; i < localStorage.length; i++){
      if( localStorage.key(i)!="user_token" && localStorage.key(i)!="transactionDetails" && localStorage.key(i)!="OrderedBooks"){
        var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
        bookIds.push(json['bookID']);
      }
    } 
    if(this.emaild!=null){
    this.userService.getUser(this.emaild).subscribe(
      personID=>{
        console.log(personID);
        this.order.bookIds = String(bookIds);
        this.order.personId = personID
        this.order.totalItems = this.totalItems
        this.order.totalMoney = this.totalSum
        this.order.status = "Pending Payment"
        this.checkinservice.saveOrder(this.order).subscribe(
          (res:any)=>{
            console.log(res);
            this.order = res
            this.paymentService.sendPayment(this.order).subscribe(
              (resp:any)=>{
                console.log(resp)
                console.log(resp.paymentOptions.paymentUrl)
                console.log(resp.paymentOrder)
                window.location.href = resp.paymentOptions.paymentUrl
                localStorage.setItem("transactionDetails",JSON.stringify(resp.paymentOrder))
                localStorage.setItem("OrderedBooks",JSON.stringify(this.booksOnCart))
                var bookId = this.order.bookIds.split(",")
                for (var i = 0; i < bookId.length; i++){
                    localStorage.removeItem(bookId[i]);
                }
              }
            );
          });
      });
    }


  }
}
