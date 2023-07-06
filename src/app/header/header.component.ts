import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../types";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated: boolean = false;
  loginLink: string = "";
  user: User = User.createEmpty();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.isAuthenticated().subscribe(data => this.authenticated = data);
    this.api.getLoginLink().subscribe(data => this.loginLink = data.url);
    this.api.getUser().subscribe(data => this.user = data);
  }

  ngOnDestroy() {
  }

}
