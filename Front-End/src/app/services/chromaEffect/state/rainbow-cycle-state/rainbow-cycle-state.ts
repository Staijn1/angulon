import {State} from '../abstract/state';
import {iroColorObject} from '../../../../types/types';
import {calculateBGRInteger, color_wheel, constrain} from '../../../../shared/functions';
import {delay} from 'rxjs/operators';
import {NUM_LEDS} from '../../../../shared/constants';

export class RainbowCycleState extends State {
    private keyboardColors = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private mouseColors = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    effect;
    private counter = 0;

    handle(colors: iroColorObject[]): void {
        clearInterval(this.effect);
        this.effect = setInterval(
            () => {
                this.setEffect(calculateBGRInteger(colors[0].red, colors[0].green, colors[0].blue), calculateBGRInteger(colors[1].red, colors[1].green, colors[1].blue));
            }, this._context.speed / 256);

    }


    setEffect(color: number, backgroundColor: number): void {
        this.setColor(this.keyboardColors);
        this.setColor(this.mouseColors);


        this.counter = (this.counter + 1) & 0xFF;
        this._context.createKeyboardEffect('CHROMA_CUSTOM', this.keyboardColors).then();
        this._context.createMouseEffect('CHROMA_CUSTOM2', this.mouseColors).then();
    }

    private setColor(colors: number[][]): void {
        // tslint:disable-next-line:prefer-for-of
        for (let row = 0; row < colors.length; row++) {
            for (let column = 0; column < colors[0].length; column++) {
                colors[row][column] = color_wheel(((column * 256 / this._context.keyboard.columns) + this.counter) & 0xFF);
            }
        }
    }

    onEntry(): void {
        this.effect = clearInterval();
        this.effect = undefined;
    }

    onExit(): void {
        clearInterval(this.effect);
        this.effect = undefined;
        this.counter = 0;
    }
}
