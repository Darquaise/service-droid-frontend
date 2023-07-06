import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../ui.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private ui: UiService) {
  }

  ngOnInit() {
    this.ui.updateSelectedSub(2)
  }

}