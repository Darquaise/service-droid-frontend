import {Component, Input} from '@angular/core';
import {PartialGuild} from "../../../types";

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent {
  @Input() guild: PartialGuild = PartialGuild.createEmpty();
}
