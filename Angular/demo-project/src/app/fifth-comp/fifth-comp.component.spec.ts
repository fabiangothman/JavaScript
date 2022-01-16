import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthCompComponent } from './fifth-comp.component';

describe('FifthCompComponent', () => {
  let component: FifthCompComponent;
  let fixture: ComponentFixture<FifthCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
