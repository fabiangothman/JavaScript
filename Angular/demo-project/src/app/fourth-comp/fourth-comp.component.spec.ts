import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthCompComponent } from './fourth-comp.component';

describe('FourthCompComponent', () => {
  let component: FourthCompComponent;
  let fixture: ComponentFixture<FourthCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
