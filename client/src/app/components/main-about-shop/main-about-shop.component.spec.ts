import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAboutShopComponent } from './main-about-shop.component';

describe('MainAboutShopComponent', () => {
  let component: MainAboutShopComponent;
  let fixture: ComponentFixture<MainAboutShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAboutShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAboutShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
