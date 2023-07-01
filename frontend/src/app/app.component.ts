import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutService } from './_services/about.service';
import { AuthService } from './_services/auth.service';
import { FunctionService } from './_services/function.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  width:number=window.innerWidth;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private func:FunctionService,
    private about:AboutService,
    public auth:AuthService
  ){
    this.matIconRegistry.addSvgIcon(
      "google",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/google.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ok",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/ok.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "vk",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/vk.svg")
    );
  }
  ngOnInit(): void {
    this.func.About().subscribe(
      ()=>{
        this.about.container=this.func.getAbout();
        console.log(this.about.container)
      }
    )
    window.addEventListener('resize',()=>{
      this.width=window.innerWidth;
    })
  }

  title = 'mitina';
  opened:boolean=false;
}

