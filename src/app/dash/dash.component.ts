import {Component, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  selectedGuild: bigint = 0n;

  sRouter: Subscription = new Subscription();

  constructor(private ui: UiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    /* for first load */
    if ('id' in this.route.snapshot.params) {
      this.updateSelectedGuild();
    }

    /* for continuous events */
    this.sRouter = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedGuild();
      }
    })

  }

  updateSelectedGuild() {
    const newID: bigint = BigInt(this.route.snapshot.params['id']);
    this.ui.updateSelectedGuild(newID);
    this.selectedGuild = newID;
  }

}
