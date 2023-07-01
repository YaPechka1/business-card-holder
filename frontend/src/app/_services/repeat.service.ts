import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepeatService {

  constructor(private http: HttpClient) { }
  // repeatPost(url:string, body:any):Observable<{ any }> 
}
