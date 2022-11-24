import {Injectable} from '@angular/core'
import {GradientInformation} from "@angulon/interfaces";
import {MessageService} from "../error/message.service";
import {environment} from "../../../environments/environment";
import {WebsocketService} from "../websocketconnection/websocket.service";

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  url = environment.url

  constructor(private readonly messageService: MessageService, private readonly websocket: WebsocketService) {
  }

  async getGradients(): Promise<GradientInformation[]> {
    return this.websocket.getGradients();
  }

  async editGradient(gradient: GradientInformation): Promise<GradientInformation[]> {
    this.messageService.setMessage(new Error("This action is not implemented"))
    return this.getGradients()
  }

  async removeGradient(gradient: GradientInformation): Promise<GradientInformation[]> {
    this.messageService.setMessage(new Error("This action is not implemented"))
    return this.getGradients()
  }

  async addGradient(newGradient: GradientInformation): Promise<GradientInformation[]> {
    this.messageService.setMessage(new Error("This action is not implemented"))
    return this.getGradients()
  }

  private handleError(response: Response): void {
    if (!response.ok) {
      this.messageService.setMessage(new Error(response.statusText))
    }
  }
}