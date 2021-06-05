import {Injectable} from '@angular/core'
import {Connection} from '../../shared/interfaces/Connection'
import {iroColorObject} from '../../shared/types/types'
import {WebsocketService} from '../websocketconnection/websocket.service'
import {HTTPConnectionService} from '../httpconnection/httpconnection.service'
import {ModeInformation} from '../../shared/types/ModeInformation'
import {GradientInformation} from '../../shared/types/GradientInformation'

@Injectable({
    providedIn: 'root'
})
export class ConnectionService extends Connection {

    constructor(private websocketService: WebsocketService, private apiService: HTTPConnectionService) {
        super()
    }

    decreaseBrightness(): void {
        this.apiService.decreaseBrightness()
    }

    decreaseSpeed(): void {
        this.apiService.decreaseSpeed()
    }

    increaseBrightness(): void {
        this.apiService.increaseBrightness()
    }

    increaseSpeed(): void {
        this.apiService.increaseSpeed()
    }

    protected send(command: string): void {
        throw Error('Not implemented')
    }

    setColor(colors: iroColorObject[] | string[]): void {
        this.apiService.setColor(colors)
    }

    setLeds(amount: number): void {
        this.websocketService.setLeds(amount)
    }

    setMode(mode: number): void {
        this.websocketService.setMode(mode)
    }

    async getModes(): Promise<ModeInformation[]> {
        return this.apiService.getModes()
    }

    async getGradients(): Promise<GradientInformation[]> {
        return this.apiService.getGradients()
    }
}
