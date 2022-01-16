import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdComponentAutoComponent } from './third-component-auto.component';

describe('ThirdComponentAutoComponent', () => {
  let component: ThirdComponentAutoComponent;
  let fixture: ComponentFixture<ThirdComponentAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdComponentAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdComponentAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
