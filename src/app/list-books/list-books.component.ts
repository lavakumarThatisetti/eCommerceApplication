import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookImages } from 'src/models/BookImages';
import { Books } from 'src/models/Books';
import { BooksService } from '../service/books.service';
import { CheckinService } from '../service/checkin.service';
import { CartValidation } from '../validation/cartValdiation';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  title = 'BooksZone';
  BooksData:Books[];
  BooksImages:BookImages[];
  BooksOnCart: Array<Books> = [];
  book_item: Books;
  checkRating:Boolean;
  totalImages:Number;
  totalBooks:Number;
  searchBook:String;
  notscrolly = true;
  notEmptyBook = true;
  initialLoad:number;
  Math = Math;
  books:Books[];
  constructor(private booksService:BooksService,
    private checkinservice:CheckinService,
    private cartValidation:CartValidation,
    private router: Router,
    private spinner: NgxSpinnerService){

    this.checkRating=false
  }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(booksdata=>{
      this.books=booksdata;
      this.books.sort((a,b) => b.average_rating.toString().localeCompare(a.average_rating.toString()));
      this.totalBooks=this.books.length;
      this.initialLoad=50;
      this.BooksData=this.books.slice(0,this.initialLoad);
      console.log(this.BooksData[1]);
      console.log(this.totalBooks);
    });
    this.booksService.getImages().subscribe(bookImages=>{
      this.BooksImages=bookImages;
      console.log(this.BooksImages);
      this.totalImages = this.BooksImages.length
    });
  }
  onScroll(){
    if (this.notscrolly && this.notEmptyBook) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
     }
  }
  loadNextPost() {
     var displayNextBooks= this.initialLoad*2;
     this.BooksData = this.BooksData.concat(this.books.slice(this.initialLoad,displayNextBooks));
     this.initialLoad = displayNextBooks;
     console.log(displayNextBooks);
     if(displayNextBooks > this.totalBooks){
      this.notEmptyBook=false;
     }
     this.notscrolly = true;
  }
  AddtoCart(book){
    if(!this.BooksOnCart.some(books => books.bookID === book.bookID)){
      console.log("Added in card")
      console.log(book.bookID)
      console.log(book.title)
      console.log(book.authors)
      console.log(book.isbn)
      console.log(book.average_rating)
      console.log(book.price)
      this.BooksOnCart.push(book)
      localStorage.setItem(book.bookID,JSON.stringify(book))
      this.cartValidation.adding()
    }else{
      this.cartValidation.alreadyadd()
    }
  }
  open(book){
    this.book_item = book;
    this.book_item.title=this.book_item.title.slice(0,this.book_item.title.indexOf("("));
    this.checkRating=true;
    
  }
  viewCart(){
    this.checkinservice.checkBooks.next(this.BooksOnCart);
    this.router.navigate(['/cart']);
  }
}
