import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from '../pages/settings-page/settings-page.component';
import { ModePageComponent } from '../pages/mode-page/mode-page.component';
import { VisualizerPageComponent } from '../pages/visualizer-page/visualizer-page.component';
import { ShortcutPageComponent } from '../pages/shortcut-page/shortcut-page.component';
import { HomePageComponent } from "../pages/home-page/home-page.component";
import { NotFoundPageComponent } from "../pages/not-found-page/not-found-page.component";
import {
  SpotifyAuthenticationCallbackComponent
} from "../pages/spotify-callback-page/spotify-authentication-callback.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'visualizer', component: VisualizerPageComponent },
  { path: 'mode', component: ModePageComponent },
  {
    path: 'spotify-callback',
    component: SpotifyAuthenticationCallbackComponent
  },
  { path: 'settings', component: SettingsPageComponent },
  {
    path: 'shortcut',
    component: ShortcutPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
