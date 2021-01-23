
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  constructor() { }
  checkBooks = new BehaviorSubject<any[]>([]);
}
