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

/* Services */
// soon to be added

const routes: Routes = [
    {path: '', component: AppComponent}
]

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
