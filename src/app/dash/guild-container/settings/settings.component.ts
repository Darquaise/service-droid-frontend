import {Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {UiService} from "../../../ui.service";
import {guildSettings} from "../../../types";
import {ApiService} from "../../../api.service";
import {Subscription, take} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedGuild: bigint = 0n;
  guildSettings: guildSettings = {guild_channels: {permitted: [], notPermitted: []}, channels: [], guild_roles: [], roles: []};

  sGuild: Subscription = new Subscription();

  constructor(private api: ApiService, private ui: UiService, private cd: ChangeDetectorRef, private messageService: MessageService) {
  }

  ngOnInit() {
    this.ui.updateSelectedSub(2);
    this.sGuild = this.ui.getSelectedGuild().subscribe(guildID => {
      this.selectedGuild = guildID;
      this.updateSettings();
    });
  }

  ngOnDestroy() {
    this.sGuild.unsubscribe();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  updateSettings() {
    this.api.fetchGuildSettings(this.selectedGuild).pipe(take(1)).subscribe(settings => {
      this.guildSettings = settings;
      console.log(this.selectedGuild)
      console.log(settings)
    });
  }

  deleteRole(channelID: string, roleID: string) {
    this.api.deleteLFGRole('' + this.selectedGuild, channelID, roleID).pipe(take(1)).subscribe(data => {
      if (data.successful) {
        this.messageService.add({severity: 'success', summary: 'Deleted Successfully!'})
        this.updateSettings();
      } else {
        this.messageService.add({severity: 'error', summary: 'Delete Failed!', detail: 'No further information given'})
      }
    })
  }

}
