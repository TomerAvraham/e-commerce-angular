import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-about-shop',
  templateUrl: './main-about-shop.component.html',
  styleUrls: ['./main-about-shop.component.css'],
})
export class MainAboutShopComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
