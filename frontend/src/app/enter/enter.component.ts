import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../_interface/interface';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
  form!: FormGroup
  message:string ='';

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {

    window.addEventListener('resize',()=>{
      this.redirect();
    })
    this.redirect();


    if (this.auth.isEnter()){
      this.router.navigate(['/admin']);
    }
    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required, Validators.minLength(2)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)])
    })

  }
  redirect(){
    if (this.router.url=='/login' && window.innerWidth<1250) this.router.navigate(['/']);
  }
  onSubmit(){
    const user: UserLogin = {
      login: this.form.value.login,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(
      () => {
        if (!localStorage.getItem('token')) {
          
          this.message = 'неверный логин или пароль';
        }
        else {
          this.message = '';
          this.router.navigate(['/admin'])
        }
      },
      error => {
        console.warn(error);
      }
    )
  }

}
