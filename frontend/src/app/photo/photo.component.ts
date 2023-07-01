import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../_services/function.service';
import { PathService } from '../_services/path.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  photoLoad:boolean=true;
  photo: string[] = [];

  pathServer: string = this.path.path

  constructor(private path:PathService, private functionService: FunctionService) { }

  ngOnInit(): void {
    this.getPhoto()
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

}
