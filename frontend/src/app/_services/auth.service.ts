import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLogin } from '../_interface/interface';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';
  constructor(private http: HttpClient, private path: PathService) { }

  login(user: UserLogin): Observable<{ token: string, id_user: string, tokenUpdate: string }> {
    return this.http.post<{ token: string, id_user: string, tokenUpdate: string }>(this.path.path + 'api/auth/login', user)
      .pipe(
        tap(
          ({ token, id_user, tokenUpdate }) => {
            this.token = token;
            if (token!='false') localStorage.setItem('token', token);
            localStorage.setItem('id_user', id_user);
            localStorage.setItem('tokenUpdate', tokenUpdate)

            console.log(token + "  <>  " + id_user);

          }))
  }
  refreshToken(tokenUpdate: string, id_user:string) {
    
    // console.log(this.http.post(this.path.path+ 'api/auth/loginOnToken', {token:tokenUpdate, id_user:id_user}))
    return this.http.post(this.path.path+ 'api/auth/loginOnToken', {token:tokenUpdate, id_user:id_user} );
  }

  getToken():string{
    return this.token;
  }
  test(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.path.path + 'api/auth/test')
      .pipe(
        tap(
          ({ message }) => {
            console.log(message);
          }))
  }
  isEnter(): boolean {
    return !!localStorage.getItem('token');
  }
  exit(): Observable<{ message:string }> {
    return this.http.post<{ message:string }>(this.path.path + 'api/auth/exit', {token:localStorage.getItem('tokenUpdate'),id_user:localStorage.getItem('id_user')})
  }
}
