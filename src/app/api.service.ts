import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, take, throwError} from "rxjs";
import {
  PartialGuild,
  linkData,
  wasSuccessful,
  rawUser,
  rawPartialGuildsGroup,
  User,
  guildSettings,
  dID,
  status
} from "./types";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private state: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authCheckDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private user: BehaviorSubject<User> = new BehaviorSubject<User>(User.createEmpty());
  private availableGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);
  private optionalGuilds: BehaviorSubject<PartialGuild[]> = new BehaviorSubject<PartialGuild[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.getStatus().pipe(catchError(this.handleError)).subscribe(status => {
      console.log(`status: ${status.status}`);
      if (
        status.status === 0 /* all good */ ||
        status.status === 1 /* high usage */
      ) {
        this.updateValues()
      } else if (
        status.status === 2 /* bot unavailable */ ||
        status.status === 3 /* discord unavailable */ ||
        status.status === 4 /* API unavailable*/
      ) {
        this.router.navigate(['/']).catch();
      } else {
        // figure something out
        console.error('???')
      }

      this.state.next(status.status);

    })

  }

  private updateValues() {
    /* make requests */
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 504) {
      return of<status>({status: 4})
    } else if (error.status == 401) {

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /* fetch without authentication */
  private getStatus(): Observable<status> {
    return this.http.get<status>('/api/status')
  }

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
    return this.http.get<rawUser>('/api/user')
  }

  private fetchUserGuilds(): Observable<rawPartialGuildsGroup> {
    return this.http.get<rawPartialGuildsGroup>('/api/user/guilds')
  }

  fetchGuildSettings(guildId: bigint): Observable<guildSettings> {
    return this.http.get<guildSettings>('/api/guild/' + guildId + '/settings')
  }

  /* subscriptions */
  isAPIAvailable(): Observable<number> {
    return this.state.asObservable();
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

  /* set settings */
  addLFGChannel(guildID: dID, channelID: string, roleID: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/add_lfg_channel',{params: {channel_id: channelID, role_id: roleID}}
    );
  }

  deleteLFGChannel(guildID: dID, channelID: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/delete_lfg_channel',{params: {channel_id: channelID}}
    );
  }

  addLFGRole(guildID: dID, channelID: string, roleID: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/add_lfg_role',{params: {channel_id: channelID, role_id: roleID}}
    );
  }

  deleteLFGRole(guildID: dID, channelID: string, roleID: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/delete_lfg_role',{params: {channel_id: channelID, role_id: roleID}}
    );
  }

  addHostRole(guildID: dID, roleID: string, cooldown: number, cooldownType: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/add_host_role',{params: {role_id: roleID, cooldown: cooldown, cooldown_type: cooldownType}}
    );
  }

  editHostRole(guildID: dID, roleID: string, cooldown: number, cooldownType: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/edit_host_role',{params: {role_id: roleID, cooldown: cooldown, cooldown_type: cooldownType}}
    );
  }

  deleteHostRole(guildID: dID, roleID: string) {
    return this.http.get<wasSuccessful>(
      '/api/guild/' + guildID + '/delete_host_role',{params: {role_id: roleID}}
    );
  }

}
