import {State} from '../abstract/state'
import {calculateBGRInteger, color_wheel, convertRGBIntegerToArray} from '../../../../shared/functions'
import iro from '@jaames/iro'

export class RainbowState extends State {
    private counter = 0;
    private interval: NodeJS.Timeout;

    onExit(): void {
        this.reset()
    }

    onEntry(): void {
        this.reset()
    }


    handle(colors: iro.Color[]): void {
        this.reset()
        if (this.interval === undefined) {
            this.interval = setInterval(() => {
                const rgbArray = convertRGBIntegerToArray(color_wheel(this.counter))
                const BGRInteger = calculateBGRInteger(rgbArray[0], rgbArray[1], rgbArray[2])
                this.counter++
                this.counter = this.counter % 255

                this._context.createHeadsetEffect('CHROMA_STATIC', BGRInteger).then()
                this._context.createKeyboardEffect('CHROMA_STATIC', BGRInteger).then()
                this._context.createMouseEffect('CHROMA_STATIC', BGRInteger).then()
            }, (Math.ceil(this._context.speed / 256)))
        }
    }

    private reset(): void {
        clearInterval(this.interval)
        this.interval = undefined
        this.counter = 0
    }
}
