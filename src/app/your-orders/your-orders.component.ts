import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookImages } from 'src/models/BookImages';
import { Books } from 'src/models/Books';

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.component.html',
  styleUrls: ['./your-orders.component.css']
})
export class YourOrdersComponent implements OnInit {

  constructor(private router:Router) { }

  orderedBooksList:Books[];

  ngOnInit(): void {
    if( localStorage.getItem("user_token")==null  || localStorage.getItem("transactionDetails")==null){
      this.router.navigateByUrl("/list");
    }
    var orderBooks = JSON.parse(localStorage.getItem("OrderedBooks"))
    this.orderedBooksList = orderBooks
    console.log(orderBooks)
    console.log(this.orderedBooksList)
  }
  mainMenu(){
    this.router.navigate(["list"]);
  }

}
