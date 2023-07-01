import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicEducationalResourcesComponent } from './electronic-educational-resources.component';

describe('ElectronicEducationalResourcesComponent', () => {
  let component: ElectronicEducationalResourcesComponent;
  let fixture: ComponentFixture<ElectronicEducationalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicEducationalResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicEducationalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
