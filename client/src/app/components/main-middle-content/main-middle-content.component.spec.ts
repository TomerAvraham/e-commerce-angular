import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMiddleContentComponent } from './main-middle-content.component';

describe('MainMiddleContentComponent', () => {
  let component: MainMiddleContentComponent;
  let fixture: ComponentFixture<MainMiddleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMiddleContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMiddleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
