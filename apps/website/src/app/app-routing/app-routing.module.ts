import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SettingsPageComponent} from '../pages/settings-page/settings-page.component'
import {ModePageComponent} from '../pages/mode-page/mode-page.component'
import {VisualizerPageComponent} from '../pages/visualizer-page/visualizer-page.component'
import {VisualizerPage3DComponent} from '../pages/visualizer-page3-d/visualizer-page3-d.component'


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', loadChildren: () => import('../pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'visualizer', component: VisualizerPageComponent},
  {path: 'mode', component: ModePageComponent},
  {
    path: 'gradients-editor',
    loadChildren: () => import('../pages/gradient-editor-page/gradient-editor.module').then(m => m.GradientEditorModule)
  },
  {
    path: 'spotify-callback',
    loadChildren: () => import('../pages/spotify-callback-page/spotify-callback-page.module').then(m => m.SpotifyCallbackPageModule)
  },
  {path: 'settings', component: SettingsPageComponent},
  {path: 'visualizer3d', component: VisualizerPage3DComponent},
  {
    path: '**',
    loadChildren: () => import('../pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
