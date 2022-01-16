import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhCompComponent } from './seventh-comp.component';

describe('SeventhCompComponent', () => {
  let component: SeventhCompComponent;
  let fixture: ComponentFixture<SeventhCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeventhCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeventhCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
