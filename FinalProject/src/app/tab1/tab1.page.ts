import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  cities = [];
  constructor(private userService: UserService) {

  }

  async  ngOnInit() {
    this.cities = await this.userService.getCitiesAsync();
    console.log(this.cities);
  }
  testClick(){}
}
