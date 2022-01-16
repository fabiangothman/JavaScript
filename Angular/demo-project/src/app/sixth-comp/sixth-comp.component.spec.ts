import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthCompComponent } from './sixth-comp.component';

describe('SixthCompComponent', () => {
  let component: SixthCompComponent;
  let fixture: ComponentFixture<SixthCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SixthCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
