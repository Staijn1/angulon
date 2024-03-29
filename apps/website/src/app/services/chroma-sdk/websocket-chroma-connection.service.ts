import {Injectable} from "@angular/core";
import {BaseChromaConnection} from "./base-chroma-connection.service";

@Injectable({
  providedIn: "root"
})
export class WebsocketChromaConnectionService extends BaseChromaConnection {
  private connection!: WebSocket;

  getChromaSDKUrl(): string {
    return "ws://localhost:13337/razer/chromasdk";
  }

  /**
   * Connects to the Razer chroma SDK and registers this application
   */
  async initialize(): Promise<void> {
    this.connection = new WebSocket(this.getChromaSDKUrl());
    this.connection.onopen = () => {
      console.log("Connected to Chroma SDK at " + this.connection.url);
      this.connection.send(JSON.stringify(this.APPLICATION_DATA));
    };

    this.connection.onerror = (error) => {
      console.error(`Failed to connect to websocket at ${this.connection.url}`, error);
      return Promise.reject(error);
    };
  }

  unInitialize(): Promise<void> {
    console.log("Closing connection to Chroma SDK at " + this.connection.url);
    this.connection.close(1000, "Closing connection");
    return Promise.resolve();
  }

  override async call(endpoint: string, effect: Record<string, unknown>): Promise<void> {
    if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
      console.warn("Attempted to send a message to the Chroma SDK, but the connection was not open");
      return;
    }

    const payload = {
      ...effect,
      endpoint: endpoint
    };

    this.connection.send(JSON.stringify(payload));
    return Promise.resolve();
  }
}
