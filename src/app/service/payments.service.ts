import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/models/Order';
import {environment} from '../../environments/environment';

const httpOptions ={
  headers: new HttpHeaders(
    {
      'Content-Type':'application/json',
      'Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS,DELETE',
      'Access-Control-Allow-Headers':'*'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = environment.baseUrl;
  paymentGatewayUrl='/paymentGateway';
  constructor(private http:HttpClient) { }
  sendPayment(order: Order):Observable<any>{
    console.log("this ",order);
    return this.http.post(this.paymentGatewayUrl,order);
  }
}
