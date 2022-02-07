import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Friend } from '../models/Friend';
import { FriendService } from '../../services/Friend.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  friends: Friend[];
  constructor(private friendService: FriendService) {

  }

  async ngOnInit() {
    this.friends = await this.friendService.getMyFriends('d6624583-28d6-43dc-8d0e-5389d6270c94');
  }
}
