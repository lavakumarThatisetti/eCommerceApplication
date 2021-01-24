
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/models/Order';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  checkBooks = new BehaviorSubject<any[]>([]);
  baseUrl = environment.baseUrl
  saveOrderUrl='/saveOrder';
  constructor(private http:HttpClient) { }

  saveOrder(order: Order):Observable<any>{
    console.log(order);
    return this.http.post(this.baseUrl+this.saveOrderUrl,order);
  }
}
