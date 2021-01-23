import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartValidation {
  constructor() { }

  adding() {
    alert("sucessfully added")
  }
  alreadyadd(){
   alert("Already added into cart")
  }
}