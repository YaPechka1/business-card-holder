import { newArray } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AboutService } from '../_services/about.service';
import { AdminService } from '../_services/admin.service';
import { AuthService } from '../_services/auth.service';
import { FunctionService } from '../_services/function.service';
import { PathService } from '../_services/path.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  width:number=window.innerWidth;

  formLogin!: FormGroup;
  formPassword!: FormGroup;

  edit:boolean=false;

  methodLoad: boolean = true;
  examLoad: boolean = true;

  photoLoad: boolean = true;

  photoContentLoad: boolean = true;
  videoContentLoad: boolean = true;
  fileContentLoad: boolean = true;

  photoModal:boolean = false;
  videoModal:boolean = false;
  fileModal:boolean = false;

  contentId:number=-1;
  contentIdMain:number=-1;

  method: string[] = [];
  exam: string[] = [];

  photo: string[] = [];

  photoContent: string[] = [];
  videoContent: string[] = [];
  fileContent: string[] = [];

  photoContentPage: string[] = [];
  videoContentPage: string[] = [];
  fileContentPage: string[] = [];

  pathServer: string = this.path.path

  @ViewChild('examInput') examInput!: ElementRef;
  @ViewChild('methodInput') methodInput!: ElementRef;
  @ViewChild('photoInput') photoInput!: ElementRef;

  @ViewChild('photoContentInput') photoContentInput!: ElementRef;
  @ViewChild('videoContentInput') videoContentInput!: ElementRef;
  @ViewChild('fileContentInput') fileContentInput!: ElementRef;



  photoName: string[] = [];
  methodName: string[] = [];
  examName: string[] = [];
  temp: any = '';

  index:number=0;

  messageLogin:string='';
  messagePassword:string='';

  constructor(private functionService: FunctionService, private path: PathService, private admin: AdminService, public about: AboutService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    window.addEventListener('resize',()=>{
      this.redirect();
    })
    this.redirect();

    this.functionService.About().subscribe(
      ()=>{
        this.about.container=this.functionService.getAbout();
        console.log(this.about.container)
      }
    )
  
    this.formLogin = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      loginNew: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
    this.formPassword = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordNew: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordNewRep: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.getMethod();
    this.getExam();
    this.getPhoto();

    this.getPhotoContent();
    this.getFileContent();
    this.getVideoContent();
  }
  redirect(){
    if (this.router.url=='/admin' && window.innerWidth<1250) this.router.navigate(['/']);
  }
  getMethod() {
    this.methodLoad = true;
    this.functionService.Method().subscribe(
      () => {
        this.method = this.functionService.getMethod();
        this.methodLoad = false;
      }
    )
  }
  getExam() {
    this.examLoad = true;
    this.functionService.Exam().subscribe(
      () => {
        this.exam = this.functionService.getExam();
        this.examLoad = false;
      }
    )
  }
  
  getPhoto() {
    this.photoLoad = true;
    this.functionService.Photo().subscribe(
      () => {
        this.photo = this.functionService.getPhoto();
        this.photoLoad = false;
      }
    )
  }


  DeletePhoto(nameFile: string, i: number) {
    this.admin.deletePhoto(nameFile).subscribe(
      () => {
        this.photo = this.arrayDelete(this.photo, i);
      }
    );
  }
  DeleteExam(nameFile: string, i: number) {
    this.admin.deleteExam(nameFile).subscribe(
      () => {
        this.exam = this.arrayDelete(this.exam, i);
      }
    );
  }
  DeleteMethod(nameFile: string, i: number) {
    this.admin.deleteMethod(nameFile).subscribe(
      () => {
        this.method = this.arrayDelete(this.method, i)
      }
    );
  }

  DeletePhotoContent(nameFile: string, i: number) {
    this.admin.deletePhotoContent(nameFile).subscribe(
      () => {
        this.photoContentPage = this.arrayDelete(this.photoContentPage, i);
      }
    );
  }

  DeleteVideoContent(nameFile: string, i: number) {
    this.admin.deleteVideoContent(nameFile).subscribe(
      () => {
        this.videoContentPage = this.arrayDelete(this.videoContentPage, i);
      }
    );
  }
  DeleteFileContent(nameFile: string, i: number) {
    this.admin.deleteFileContent(nameFile).subscribe(
      () => {
        this.fileContentPage = this.arrayDelete(this.fileContentPage, i);
      }
    );
  }
  


  onSubmitLogin() {

    this.admin.changeLogin(this.formLogin.value.login, this.formLogin.value.loginNew).subscribe(
      () => {
        this.messageLogin=this.admin.getMessageLogin();
      },
      error => {
        console.warn(error);
      }
    )

  }
  onSubmitPassword() {
    this.admin.changePassword(this.formPassword.value.password, this.formPassword.value.passwordNew).subscribe(
      () => {
        this.messagePassword=this.admin.getMessagePassword();
      },
      error => {
        console.warn(error);
      }
    )
  }
  arrayDelete(array: string[], index: number): string[] {
    let q: string[] = [];
    for (let i = 0; i < array.length; i++) {
      if (index != i) q.push(array[i])
    }
    return q;
  }

  onFileSelectedPhoto() {
    this.photoName = [];

    for (let i = 0; i < this.photoInput.nativeElement.files.length; i++) {
      console.log(this.photoInput.nativeElement.files[i]);
      this.photoName.push(this.photoInput.nativeElement.files[i].name)
    }

  }

  onFileSelectedContentPhoto() {
    this.photoContent = [];
    for (let i = 0; i < this.photoContentInput.nativeElement.files.length; i++) {
      console.log(this.photoContentInput.nativeElement.files[i]);
      this.photoContent.push(this.photoContentInput.nativeElement.files[i].name)
    }
  }

  onFileSelectedContentVideo() {
    this.videoContent = [];

    for (let i = 0; i < this.videoContentInput.nativeElement.files.length; i++) {
      console.log(this.videoContentInput.nativeElement.files[i]);
      this.videoContent.push(this.videoContentInput.nativeElement.files[i].name)
    }
  }

  onFileSelectedContentFile() {
    this.fileContent = [];

    for (let i = 0; i < this.fileContentInput.nativeElement.files.length; i++) {
      console.log(this.fileContentInput.nativeElement.files[i]);
      this.fileContent.push(this.fileContentInput.nativeElement.files[i].name)
    }
  }

  onFileSelectedMethod() {
    this.methodName = [];

    for (let i = 0; i < this.methodInput.nativeElement.files.length; i++) {
      console.log(this.methodInput.nativeElement.files[i]);
      this.methodName.push(this.methodInput.nativeElement.files[i].name)
    }

  }
  onFileSelectedExam() {
    this.examName = [];

    for (let i = 0; i < this.examInput.nativeElement.files.length; i++) {
      console.log(this.examInput.nativeElement.files[i]);
      this.examName.push(this.examInput.nativeElement.files[i].name)
    }
  }

  uploadMethod() {
    this.methodLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.methodInput.nativeElement.files.length; i++) {
      q.push(this.methodInput.nativeElement.files[i]);
    }
    this.admin.uploadMethod(q).subscribe(
      () => {
        this.methodName = [];
        this.getMethod();
      }
    );
  }
  uploadExam() {
    this.examLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.examInput.nativeElement.files.length; i++) {
      q.push(this.examInput.nativeElement.files[i]);
    }
    this.admin.uploadExam(q).subscribe(
      () => {
        this.examName = [];
        this.getExam();
      }
    );
  }
  uploadPhoto() {
    this.photoLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.photoInput.nativeElement.files.length; i++) {
      q.push(this.photoInput.nativeElement.files[i]);
      console.log(109190)
    }
    this.admin.uploadPhoto(q).subscribe(
      () => {
        this.photoName = [];
        this.getPhoto();
      }
    );
  }

  uploadContentPhoto() {
    this.photoContentLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.photoContentInput.nativeElement.files.length; i++) {
      q.push(this.photoContentInput.nativeElement.files[i]);
    }
    this.admin.uploadContentPhoto(q).subscribe(
      () => {
        this.photoContent = [];
        this.getPhotoContent();
      }
    );
  }
  uploadContentVideo() {
    this.videoContentLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.videoContentInput.nativeElement.files.length; i++) {
      q.push(this.videoContentInput.nativeElement.files[i]);
    }
    this.admin.uploadContentVideo(q).subscribe(
      () => {
        this.videoContent = [];
        this.getVideoContent();
      }
    );
  }

  uploadContentFile() {
    this.fileContentLoad = true;
    let q: File[] = [];
    for (let i = 0; i < this.fileContentInput.nativeElement.files.length; i++) {
      q.push(this.fileContentInput.nativeElement.files[i]);
    }
    this.admin.uploadContentFile(q).subscribe(
      () => {
        this.fileContent = [];
        this.getFileContent();
      }
    );
  }



  deleteAboutInner(idMain: number, idLow: number) {
    console.log(idMain + " <> " + idLow);
    console.log(this.about.container[idMain].blockContent);
    // this.about.container[idMain].blockContent.slice(idLow,2)
    let q: any[] = [];
    for (let i = 0; i < this.about.container[idMain].blockContent.length; i++) {
      if (i != idLow) q.push(this.about.container[idMain].blockContent[i]);
    }
    this.about.container[idMain].blockContent = q;


  }
  deleteAbout(idMain: number) {
    let q: any[] = [];
    for (let i = 0; i < this.about.container.length; i++) {
      if (i != idMain) q.push(this.about.container[i]);
    }
    this.about.container = q;
  }

  getPhotoContent() {
    this.photoContentLoad = true;
    this.admin.PhotoContent().subscribe(
      () => {
        this.photoContentPage = this.admin.getPhotoContent();
        this.photoContentLoad = false;
      }
    )
  }
  getVideoContent() {
    this.videoContentLoad = true;
    this.admin.VideoContent().subscribe(
      () => {
        this.videoContentPage = this.admin.getVideoContent();
        this.videoContentLoad = false;
      }
    )
  }
  getFileContent() {
    this.fileContentLoad = true;
    this.admin.FileContent().subscribe(
      () => {
        this.fileContentPage = this.admin.getFileContent();
        this.fileContentLoad = false;
      }
    )
  }

  setAbout(){
    this.admin.setAbout(this.about.container).subscribe()
  }

  checkLogin(){
    (this.formLogin.get('login')?.invalid && this.formLogin.get('login')?.touched) ? this.messageLogin='Логин введен неправильно' :
    (this.formLogin.get('loginNew')?.invalid && this.formLogin.get('loginNew')?.touched) ? this.messageLogin='Новый логин введен неправильно': this.messageLogin='';
  }

  checkPassword(){
    (this.formPassword.get('password')?.invalid && this.formPassword.get('password')?.touched) ? this.messagePassword='Пароль введен неправильно' :
    (this.formPassword.get('passwordNew')?.invalid && this.formPassword.get('passwordNew')?.touched) ? this.messagePassword='Новый пароль введен неправильно': 
    (this.formPassword.get('passwordNew')?.value!=this.formPassword.get('passwordNewRep')?.value && this.formPassword.get('passwordNewRep')?.touched && this.formPassword.get('passwordNew')?.touched) ? this.messagePassword='Пароли не совпали':this.messagePassword='';
  }
  Exit(){
    this.auth.exit().subscribe(
      ()=>{
        localStorage.clear();
        this.router.navigate(['/']);
      }
    )
  }
}


