/* Angular Modules */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';

/* PrimeNG Modules */
// soon to be added

/* Components */
import {AppComponent} from './app.component';
import {CallbackComponent} from './callback/callback.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';

/* Components: Dashboard */
import {DashComponent} from './dash/dash.component';
import {SidebarComponent} from './dash/sidebar/sidebar.component';
import {GuildContainerComponent} from './dash/guild-container/guild-container.component';

/* Services */
import {ApiService} from "./api.service";



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'dashboard', component: DashComponent},
  /*{
    path: 'dashboard/:id',
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'statistics', component: StatisticsComponent}
    ]
  },*/
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
    /* Dashboard */
    DashComponent,
    SidebarComponent,
    GuildContainerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
