import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getDeviceType} from "../../functions";
import {SpotifyAuthenticationService} from "../../../services/spotify-authentication/spotify-authentication.service";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";

/// <reference types="@types/spotify-web-playback-sdk" />
declare global {
  interface window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
  }
}

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss'],
})
export class SpotifyPlayerComponent implements OnInit {
  @Output() playbackChanged: EventEmitter<Spotify.PlaybackState> = new EventEmitter<Spotify.PlaybackState>();
  private player: Spotify.Player | undefined;
  readonly spotifyIcon = faSpotify;
  spotifyAuthenticationURL!: string;

  constructor(public readonly spotifyAuth: SpotifyAuthenticationService) {
    this.spotifyAuth.generateAuthorizeURL().then(url => this.spotifyAuthenticationURL = url)
  }

  ngOnInit() {
    this.loadSpotifyWebPlaybackSDK();
  }

  /**
   * Pauses or unpause the spotify player
   */
  toggleSpotifyPlayerPlay() {
    this.player?.togglePlay();
  }

  private onSpotifyStateChanged(state: Spotify.PlaybackState) {
    this.playbackChanged.emit(state);
  }

  private loadSpotifyWebPlaybackSDK() {
    console.log("Loading Spotify Web Playback SDK")
    window.onSpotifyWebPlaybackSDKReady = () => console.log("Spotify Web Playback SDK loaded");
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.defer = true;
    window.onSpotifyWebPlaybackSDKReady = () => this.onSpotifyWebPlaybackSDKReady();
    document.body.appendChild(script);
  }

  private onSpotifyWebPlaybackSDKReady() {
    const token = this.spotifyAuth.getToken()
    const device = getDeviceType();
    this.player = new Spotify.Player({
      name: `Angulon - ${device}`,
      getOAuthToken: cb => {
        cb(token);
      },
      volume: 1
    });

    this.player.addListener("initialization_error", ({message}) => {
      console.error(message);
    });

    this.player.addListener("authentication_error", ({message}) => {
      console.error(message);
    });

    this.player.addListener("account_error", ({message}) => {
      console.error(message);
    });
    // Ready
    this.player.addListener("ready", ({device_id}) => {
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    this.player.addListener("not_ready", ({device_id}) => {
      console.log("Device ID has gone offline", device_id);
    });
    this.player.addListener("player_state_changed", state => this.onSpotifyStateChanged(state));
    this.player.connect();
  }
}