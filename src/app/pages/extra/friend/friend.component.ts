import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FriendService } from 'src/app/core/services/friend.service';
import { FriendRequestResponse, MyFriendResponse } from 'src/app/model/friend.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss'
})
export class FriendComponent implements OnInit {

  listMyFriend: MyFriendResponse[] = [];

  listFriendRequest : FriendRequestResponse[] = [];

  displayedColumns: string[] = ['info', 'action'];

  constructor(
    private spinner: NgxSpinnerService,
    private friendService : FriendService,
  ) {}

  ngOnInit(): void {
    this.getMyFriend();
    this.getFriendRequest();
  }


  getMyFriend(){
    this.spinner.show();
    const payload = {
      "id":"19aefef3-4ae9-455a-87e9-dbf6ed496c98"
    }
    this.friendService.getMyFriend(payload).subscribe( 
      (res) => {
        this.listMyFriend = res.data;
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      },
      (error) => {
        console.error('Error occurred:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    );
  }

  getFriendRequest(){
    this.spinner.show();
    const payload = {
      "id":"19aefef3-4ae9-455a-87e9-dbf6ed496c98"
    }
    this.friendService.getFriendRequest(payload).subscribe( 
      (res) => {
        this.listFriendRequest = res.data;
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      },
      (error) => {
        console.error('Error occurred:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    );
  }


}
