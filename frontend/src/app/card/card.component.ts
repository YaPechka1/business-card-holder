import { Component, OnInit } from '@angular/core';
import { AboutService } from '../_services/about.service';
import { PathService } from '../_services/path.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public about:AboutService, private path: PathService) { }

  pathServer: string = this.path.path

  ngOnInit(): void {
    
  }


}
