import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take} from "rxjs";
import {PartialGuild, linkData, wasSuccessful, rawUser, rawPartialGuildsGroup, User, guildSettings, dID} from "./types";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authCheckDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private user: BehaviorSubject<User> = new BehaviorSubject<User>(User.createEmpty());
  private availableGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);
  private optionalGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);

  constructor(private http: HttpClient) {
    this.fetchIsAuthenticated().pipe()
      .subscribe(data => {
        this.isAuthorized.next(data.successful)
        this.authCheckDone.next(true)
      });

    this.fetchUserInfo().pipe()
      .subscribe(data => this.user.next(new User(data)));

    this.fetchUserGuilds().pipe()
      .subscribe(data => {
        this.availableGuilds.next(data.availableGuilds.map(guild => new PartialGuild(guild)));
        this.optionalGuilds.next(data.optionalGuilds.map(guild => new PartialGuild(guild)));
      });
  }

  /* fetch without authentication */
  getLoginLink(): Observable<linkData> {
    return this.http.get<linkData>('/api/login_link');
  }

  redeemCode(code: string): void {
    this.http.get<wasSuccessful>('/api/callback?code=' + code).pipe(take(1))
      .subscribe(data => this.isAuthorized.next(data.successful));
  }

  /* fetch with authentication */
  private fetchIsAuthenticated(): Observable<wasSuccessful> {
    return this.http.get<wasSuccessful>('/api/authenticated');
  }

  private fetchUserInfo(): Observable<rawUser> {
    return this.http.get<rawUser>('/api/user', {withCredentials: true})
  }

  private fetchUserGuilds(): Observable<rawPartialGuildsGroup> {
    return this.http.get<rawPartialGuildsGroup>('/api/user/guilds')
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
