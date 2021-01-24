import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';
import {environment} from '../../environments/environment'

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
export class UsersService {

  baseUrl = environment.baseUrl;
  saveUserUrl='bookStore/saveUser';
  getUserUrl = 'bookStore/getUser';
  constructor(private http:HttpClient) { }
  saveUser(user: User):Observable<any>{
    return this.http.post(this.baseUrl+this.saveUserUrl,user);
  }
  getUser(email:String):Observable<Number>{
    return this.http.get<Number>(`${this.baseUrl}${this.getUserUrl}/${email}`);
  }

}
