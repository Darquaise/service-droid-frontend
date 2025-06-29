import {Component} from '@angular/core';
import {ApiService} from "./api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  APIState: number = 0;

  sAPI: Subscription = new Subscription();

  constructor(private api: ApiService) {
    this.sAPI = this.api.isAPIAvailable().subscribe(data => {
      if (data) {
        this.APIState = data;
      } else {
        // repeat request is 5 seconds cycle (maybe display on screen?)
      }

    });
  }

}
