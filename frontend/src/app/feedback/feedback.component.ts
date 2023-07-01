import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  width:number =0;

  ngOnInit(): void {
    this.editWidth();
    window.addEventListener('resize', () => { this.editWidth() }, true)

  }
  editWidth(){
    this.width=window.innerWidth;
  }

}
