import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take} from "rxjs";
import {PartialGuild, linkData, wasSuccessful, rawUser, rawPartialGuildsGroup, User} from "./types";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit, OnDestroy {
  private readonly URL: string = 'http://localhost:8000/api/';

  private isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(User.createEmpty())
  private availableGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);
  private optionalGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchIsAuthenticated().pipe()
      .subscribe(data => this.isAuthorized.next(data.successful));

    this.fetchUserInfo().pipe()
      .subscribe(data => this.user.next(new User(data)));

    this.fetchUserGuilds().pipe()
      .subscribe(data => {
        const newAvailable: PartialGuild[] = data.availableGuilds.map(guild => new PartialGuild(guild));
        const newOptional: PartialGuild[] = data.optionalGuilds.map(guild => new PartialGuild(guild));

        if (this.checkDiff(this.availableGuilds.getValue(), newAvailable)) {
          this.availableGuilds.next(newAvailable);
        }

        if (this.checkDiff(this.optionalGuilds.getValue(), newOptional)) {
          this.optionalGuilds.next(newOptional);
        }

      });
  }

  ngOnDestroy() {
  }

  /* without authentication */
  getLoginLink(): Observable<linkData> {
    return this.http.get<linkData>(this.URL + 'login_link');
  }

  redeemCode(code: string): void {
    this.http.get<wasSuccessful>(this.URL + 'callback?code=' + code).pipe(take(1))
      .subscribe(data => this.isAuthorized.next(data.successful));
  }

  /* with authentication */
  private fetchIsAuthenticated(): Observable<wasSuccessful> {
    return this.http.get<wasSuccessful>(this.URL + 'authenticated');
  }

  private fetchUserInfo(): Observable<rawUser> {
    return this.http.get<rawUser>(this.URL + 'user')
  }

  private fetchUserGuilds(): Observable<rawPartialGuildsGroup> {
    return this.http.get<rawPartialGuildsGroup>(this.URL + 'user/guilds')
  }

  private checkDiff(oldG: PartialGuild[], newG: PartialGuild[]): boolean {
    return oldG.map(g => g.id).sort().join(',') === newG.map(g => g.id).sort().join(',');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthorized.asObservable();
  }

  getUser(): Observable<User> {
    return this.user.asObservable()
  }

  getAvailableGuilds(): Observable<PartialGuild[]> {
    return this.availableGuilds.asObservable();
  }

  getOptionalGuilds(): Observable<PartialGuild[]> {
    return this.optionalGuilds.asObservable();
  }

}
