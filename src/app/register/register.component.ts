import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModal = new User("","","");
  constructor(private router:Router,private userService:UsersService) { }
  ngOnInit(): void {

  }
  saveUserDate(){
     console.log(this.userModal)
     
     this.userService.saveUser(this.userModal).subscribe((res:Response)=>{
        localStorage.setItem("user_token",this.userModal.email);
        this.router.navigateByUrl('/cart'); 
    });
  }

}
