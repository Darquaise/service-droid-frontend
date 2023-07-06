import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../ui.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private ui: UiService) {
  }

  ngOnInit() {
    this.ui.updateSelectedSub(3)
  }
}
