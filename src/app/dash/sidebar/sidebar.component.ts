import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() selectedGuild: bigint = 0n;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
