import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {subType} from "./types";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private selectedGuild: BehaviorSubject<bigint> = new BehaviorSubject<bigint>(0n);
  private selectedSub: BehaviorSubject<subType> = new BehaviorSubject<subType>(0);

  constructor() {
  }

  getSelectedSub(): Observable<subType> {
    return this.selectedSub.asObservable();
  }

  getSelectedGuild(): Observable<bigint> {
    return this.selectedGuild.asObservable();
  }

  updateSelectedSub(selected: subType): void {
    this.selectedSub.next(selected);
  }

  updateSelectedGuild(selected: bigint): void {
    this.selectedGuild.next(selected);
  }



}
