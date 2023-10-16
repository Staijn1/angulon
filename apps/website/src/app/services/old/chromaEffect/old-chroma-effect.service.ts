import { Injectable } from '@angular/core';
import { OldChromaSDKService } from '../chromaSDK/old-chroma-s-d-k.service';
import { State } from './state/abstract/state';
import { StaticState } from './state/static-state/static-state';
import iro from '@jaames/iro';
import { VisualizerState } from './state/visualizer-state/visualizer-state';
import { MessageService } from '../../message-service/message.service';
import { VisualizerBrightnessState } from './state/visualizer-brightness-state/visualizer-brightness-state';
import { Store } from '@ngrx/store';
import { UserPreferences } from '../../../shared/types/types';

/**
 * @deprecated
 */
@Injectable({
  providedIn: 'root'
})
export class OldChromaEffectService extends OldChromaSDKService {
  constructor(messageService: MessageService, store: Store<{ userPreferences: UserPreferences }>) {
    super(messageService, store);
    this._state = new StaticState();
    this._state.context = this;
  }

  _setColors: iro.Color[] = [];

  set setColors(newColors: iro.Color[] | string[]) {
    newColors = newColors.map(c => {
      if (typeof c === 'string') {
        return new iro.Color(c);
      }
      return c;
    });
    this._setColors = newColors;
    this.update();
  }

  private _state: State;

  set state(state: State) {
    this._state.onExit();
    this._state = state;
    this._state.context = this;
    this._state.onEntry();
    this.update();
  }

  private _speed = 1000;

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    if (value > 0) {
      this._speed = value;
      this.update();
    }
  }

  set intensity(value: number) {
    if (this._state instanceof VisualizerState || this._state instanceof VisualizerBrightnessState) {
      this._state.intensity = value;
      this.update();
    }
  }

  private update(): void {
    this._state.handle(this._setColors);
  }
}