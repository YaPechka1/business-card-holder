import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../_services/function.service';
import { PathService } from '../_services/path.service';

@Component({
  selector: 'app-electronic-educational-resources',
  templateUrl: './electronic-educational-resources.component.html',
  styleUrls: ['./electronic-educational-resources.component.css']
})
export class ElectronicEducationalResourcesComponent implements OnInit {

  examLoad: boolean = true;
  exam: string[] = [];

  pathServer: string = this.path.path

  constructor(private functionService: FunctionService, private path: PathService) { }

  ngOnInit(): void {
    this.getExam()
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

}
