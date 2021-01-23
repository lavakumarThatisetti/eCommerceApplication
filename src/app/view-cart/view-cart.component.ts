import { Component, OnInit } from '@angular/core';
import { Books } from 'src/models/Books';
import { CheckinService } from '../service/checkin.service';
import { CartValidation } from '../validation/cartValdiation';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  booksOnCart: Books[];
  Math = Math;
  constructor(private checkinservice:CheckinService) { }

  ngOnInit(): void {
    this.booksOnCart=[];
    for (var i = 0; i < localStorage.length; i++){
      console.log(localStorage.getItem(localStorage.key(i)));
      this.booksOnCart.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  buy(book){
    console.log("Sucessfully buy the book");
    console.log("Your Book Details");
    console.log(book.title)
    console.log(book.authors)
    console.log(book.isbn)
    console.log(book.average_rating)
    console.log(book.price)
  }

}
