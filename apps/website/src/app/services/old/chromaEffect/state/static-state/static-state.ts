import { State } from '../abstract/state';
import { calculateBGRInteger } from '../../../../../shared/functions';
import iro from '@jaames/iro';
import { HeadsetEffect, ChromaKeyboardEffectType, MouseEffect } from '../../../chromaSDK/old-chroma-s-d-k.service';

export class StaticState extends State {
  handle(colors: iro.Color[]): void {
    this.setStatic(colors[0]);
  }

  setStatic(color: iro.Color): void {
    const BGRColor = calculateBGRInteger(color.red, color.green, color.blue);
    this._context.createKeyboardEffect(ChromaKeyboardEffectType.CHROMA_STATIC, BGRColor).then();
    this._context.createMouseEffect(MouseEffect.CHROMA_STATIC, BGRColor).then();
    this._context.createHeadsetEffect(HeadsetEffect.CHROMA_STATIC, BGRColor).then();
  }

  onEntry(): void {
  }

  onExit(): void {
  }
}