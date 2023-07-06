import {Component, OnInit} from '@angular/core';
import {PartialGuild} from "../../../types";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss']
})
export class OptionalComponent implements OnInit {
  guilds: PartialGuild[] = [];
  rows: number = 0;

  constructor(private dialogConfig: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.guilds = this.dialogConfig.data.guilds;
    this.rows = Math.floor(Math.sqrt(this.guilds.length));
  }

}
