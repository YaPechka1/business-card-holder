import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor() { }
  container:any=[];

  pushNewInnerBlock(id:number){
    this.container[id].blockContent.push(
      {
        header:'',
        type:1,
        content:''
      }
    )

  }
  pushNew(){
    this.container.push({
      blockContent:[]})
  }
  getContainer():any{
    return this.container
  }
}
