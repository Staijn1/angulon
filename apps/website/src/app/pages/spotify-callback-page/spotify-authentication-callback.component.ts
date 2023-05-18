import {Component, OnInit} from '@angular/core';
import {SpotifyAuthenticationService} from "../../services/spotify-authentication/spotify-authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-spotify-authentication-callback',
  templateUrl: './spotify-authentication-callback.component.html',
  styleUrls: ['./spotify-authentication-callback.component.scss'],
})
export class SpotifyAuthenticationCallbackComponent implements OnInit{
  constructor(private readonly spotifyAuth: SpotifyAuthenticationService, private readonly router: Router) {
  }
  ngOnInit(): void {
    this.spotifyAuth.completeLogin().then(r => this.router.navigate(['/']))
  }
}