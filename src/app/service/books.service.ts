import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookImages } from 'src/models/BookImages';
import { Books } from 'src/models/Books';

const httpOptions ={
  headers: new HttpHeaders(
    {
      'Content-Type':'application/json','Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS,DELETE',
      'Access-Control-Allow-Headers':'*'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksUrl = environment.booksUrl;
  bookImages = environment.booksImagesUrl;
  constructor(private http:HttpClient) { }

  getBooks():Observable<Books[]>{
    return this.http.get<Books[]>(this.booksUrl);
  }

  getImages():Observable<BookImages[]>{
    return this.http.get<BookImages[]>(this.bookImages);
  }
}
