import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavigationbarComponent} from './components/navigationbar/navigationbar.component'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {RouterModule} from '@angular/router'
import {VisualizerComponent} from './components/visualizer/visualizer.component'
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component'
import {CastPipe} from "./pipe/CastPipe";


@NgModule({
  declarations: [NavigationbarComponent, VisualizerComponent, ColorpickerComponent, CastPipe],
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [NavigationbarComponent, RouterModule, VisualizerComponent, ColorpickerComponent, CastPipe]
})
export class SharedModule { }