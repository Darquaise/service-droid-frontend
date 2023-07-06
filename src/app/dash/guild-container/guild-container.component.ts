import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../ui.service";
import {subType} from "../../types";

@Component({
  selector: 'app-guild-container',
  templateUrl: './guild-container.component.html',
  styleUrls: ['./guild-container.component.scss']
})
export class GuildContainerComponent implements OnInit, OnDestroy {
  @Input() selectedGuild: bigint = 0n;
  subSelection: subType = 0;

  sUi: Subscription = new Subscription();

  constructor(private ui: UiService) {
  }

  ngOnInit() {
    this.sUi = this.ui.getSelectedSub().subscribe(data => this.subSelection = data);
  }

  ngOnDestroy() {
    this.sUi.unsubscribe();
  }

}
