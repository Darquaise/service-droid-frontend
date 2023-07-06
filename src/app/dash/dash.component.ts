import {Component, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  selectedGuild: bigint = 0n;

  constructor(private ui: UiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if ('id' in this.route.snapshot.params) {
      const newID = BigInt(this.route.snapshot.params['id']);
      this.ui.updateSelectedGuild(newID);
      this.selectedGuild = newID;
    }
  }

}
