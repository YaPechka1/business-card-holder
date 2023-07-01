import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private http: HttpClient, private path: PathService) { }
  

  photoFile:string[]=[];
  examFile:string[]=[];
  methodFile:string[]=[];
  page:any;


  Photo(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/function/getPhoto')
      .pipe(
        tap(
          ({ files }) => {
            this.photoFile=files;
          }))
  }
  getPhoto():string[]{
    return this.photoFile;
  }
  Exam(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/function/getExam')
      .pipe(
        tap(
          ({ files }) => {
            this.examFile=files;
          }))
  }
  getExam():string[]{
    return this.examFile;
  }
  Method(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/function/getMethod')
      .pipe(
        tap(
          ({ files }) => {
            this.methodFile=files;
          }))
  }
  getMethod():string[]{
    return this.methodFile;
  }
  About():Observable<{page:any}>{
    return this.http.get<{page:any}>(this.path.path + 'api/function/getAbout')
    .pipe(
      tap(
        ({page})=>{
          this.page=page;
        }
      )
    )
  }
  getAbout():any{
    return this.page
  }
}
