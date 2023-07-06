import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartialGuild} from "../../types";
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OptionalComponent} from "./optional/optional.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DialogService]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() selectedGuild: bigint = 0n;

  availableGuilds: PartialGuild[] = [];
  optionalGuilds: PartialGuild[] = [];

  dialog: DynamicDialogRef = new DynamicDialogRef();

  sRouter: Subscription = new Subscription();
  sGuilds: Subscription = new Subscription();
  sOGuilds: Subscription = new Subscription();


  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.sRouter = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedGuild = BigInt(this.route.snapshot.params['id']);
      }
    })

    this.sGuilds = this.api.getAvailableGuilds().subscribe(guilds => this.availableGuilds = guilds);
    this.sOGuilds = this.api.getOptionalGuilds().subscribe(guilds => this.optionalGuilds = guilds);
  }

  ngOnDestroy() {
    this.sRouter.unsubscribe();
    this.sGuilds.unsubscribe();
    this.sOGuilds.unsubscribe();
  }

  show() {
    this.dialog = this.dialogService.open(OptionalComponent, {
      data: {guilds: this.optionalGuilds},
      header: 'Select a Guild for the Bot to join'
    });
  }

}
