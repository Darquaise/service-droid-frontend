import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../ui.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private ui: UiService) {
  }

  ngOnInit() {
    this.ui.updateSelectedSub(1)
  }

}
