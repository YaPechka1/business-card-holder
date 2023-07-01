import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../_services/function.service';
import { PathService } from '../_services/path.service';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  methodLoad: boolean = true;
  method: string[] = [];

  pathServer: string = this.path.path

  constructor(private functionService: FunctionService, private path: PathService) { }

  ngOnInit(): void {
    this.getMethod()
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

}
