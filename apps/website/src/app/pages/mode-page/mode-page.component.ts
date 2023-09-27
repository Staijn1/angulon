import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StaticState } from '../../services/chromaEffect/state/static-state/static-state';
import { ChromaEffectService } from '../../services/chromaEffect/chroma-effect.service';
import { BlinkState } from '../../services/chromaEffect/state/blink-state/blink-state';
import { SingleDynamicState } from '../../services/chromaEffect/state/single-dynamic-state/single-dynamic-state';
import { MultiDynamicState } from '../../services/chromaEffect/state/multi-dynamic-state/multi-dynamic-state';
import { RainbowState } from '../../services/chromaEffect/state/rainbow-state/rainbow-state';
import { Fire2012State } from '../../services/chromaEffect/state/fire2012-state/fire2012-state';
import { WaterfallState } from '../../services/chromaEffect/state/waterfall-state/waterfall-state';
import { RainbowCycleState } from '../../services/chromaEffect/state/rainbow-cycle-state/rainbow-cycle-state';
import { VisualizerState } from '../../services/chromaEffect/state/visualizer-state/visualizer-state';
import { LedstripState, ModeInformation } from '@angulon/interfaces';
import { themes } from '../../shared/constants';
import { ThemeService } from '../../services/theme/theme.service';
import {
  VisualizerBrightnessState
} from '../../services/chromaEffect/state/visualizer-brightness-state/visualizer-brightness-state';
import { ColorpickerComponent } from '../../shared/components/colorpicker/colorpicker.component';
import { WebsocketService } from '../../services/websocketconnection/websocket.service';
import { ChangeLedstripMode } from '../../../redux/ledstrip/ledstrip.action';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-mode',
  templateUrl: './mode-page.component.html',
  styleUrls: ['./mode-page.component.scss']
})
export class ModePageComponent implements OnInit, OnDestroy {
  @ViewChild(ColorpickerComponent) colorpicker: ColorpickerComponent | undefined;

  modes: ModeInformation[] = [];
  chromaEffects = [
    { name: 'Rainbow', state: new RainbowState() },
    { name: 'Rainbow Cycle', state: new RainbowCycleState() },
    { name: 'Multi Dynamic', state: new MultiDynamicState() },
    { name: 'Single Dynamic', state: new SingleDynamicState() },
    { name: 'Blink', state: new BlinkState() },
    { name: 'Fire2012', state: new Fire2012State() },
    { name: 'Waterfall', state: new WaterfallState() },
    { name: 'VuMeter', state: new VisualizerState() },
    { name: 'VuMeter Brightness', state: new VisualizerBrightnessState() }
  ];
  classes = themes;
  selectedMode = 0;


  constructor(
    private readonly connection: WebsocketService,
    private readonly chromaService: ChromaEffectService,
    private readonly store: Store<{ ledstripState: LedstripState | undefined }>,
    public readonly themeService: ThemeService) {
  }

  ngOnDestroy(): void {
    this.modes = [];
  }

  ngOnInit(): void {
    this.connection.getModes().then(modes => {
      this.modes = modes;
    });
  }

  /**
   * Fired when the user clicks on a mode button
   * @param {MouseEvent} $event
   */
  onModeSelect($event: MouseEvent): void {
    const id = parseInt(($event.currentTarget as HTMLElement).id, 10);
    this.selectedMode = id;

    this.store.dispatch(new ChangeLedstripMode(id));

    const state = this.chromaEffects.find(stateToCompare => {
      const mode = this.modes[id];
      if (!mode) return false;
      return stateToCompare.name.toLowerCase() === mode.name?.toLowerCase();
    });

    this.chromaService.state = state === undefined ? new StaticState() : state.state;
  }
}
