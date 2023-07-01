import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  photoContent:string[]=[];
  videoContent:string[]=[];
  fileContent:string[]=[];

  messageLogin:string='';
  messagePassword:string='';

  constructor(private http: HttpClient, private path: PathService) { }

  setAbout(page:any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/setAbout', { page: page })
  }


  deletePhoto(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deletePhoto', { fileName: fileName })
  }
  deleteExam(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deleteExam', { fileName: fileName })
  }
  deleteMethod(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deleteMethod', { fileName: fileName })
  }

  deletePhotoContent(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deletePhotoContent', { fileName: fileName })
  }
  deleteVideoContent(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deleteVideoContent', { fileName: fileName })
  }
  deleteFileContent(fileName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/deleteFileContent', { fileName: fileName })
  }


  uploadPhoto(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('photos', files[i]);
    }
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadPhoto', form)
  }
  uploadExam(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('exam', files[i]);
    }
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadExam', form)
  }
  uploadMethod(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for(let i=0;i<files.length;i++){
    form.append('method', files[i]);
    }
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadMethod', form)
  }
  uploadContentPhoto(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('photos', files[i]);
    }
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadContentPhoto', form)
  }
  uploadContentVideo(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('video', files[i]);
    }
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadContentVideo', form)
  }

  uploadContentFile(files: File[]): Observable<{ message: string }> {
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i]);
    }
    console.log(files)
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/uploadContentFile', form)
  }
  PhotoContent(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/admin/getContentPhoto')
      .pipe(
        tap(
          ({ files }) => {
            this.photoContent=files;
          }))
  }
  VideoContent(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/admin/getContentVideo')
      .pipe(
        tap(
          ({ files }) => {
            this.videoContent=files;
          }))
  }
  FileContent(): Observable<{ files: string[] }> {
    return this.http.get<{ files: string[] }>(this.path.path + 'api/admin/getContentFile')
      .pipe(
        tap(
          ({ files }) => {
            this.fileContent=files;
          }))
  }
  getPhotoContent():string[]{
    return this.photoContent;
  }
  getVideoContent():string[]{
    return this.videoContent;
  }
  getFileContent():string[]{
    return this.fileContent;
  }

  changeLogin(login:string,loginNew:string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/changeLogin', { login:login,loginNew:loginNew })
    .pipe(
      tap(
        ({message})=>{
          this.messageLogin=message
          console.log(message)
        }
      )
    )
  }
  
  changePassword(password:string,passwordNew:string): Observable<{ message: string }> {
    console.log(password+" <?> "+passwordNew)
    return this.http.post<{ message: string }>(this.path.path + 'api/admin/changePassword', { password:password,passwordNew:passwordNew })
    .pipe(
      tap(
        ({message})=>{
          this.messagePassword=message
        }
      )
    )
  }
  
  getMessageLogin():string{
    return this.messageLogin
  }
  getMessagePassword():string{
    return this.messagePassword
  }
  



}
