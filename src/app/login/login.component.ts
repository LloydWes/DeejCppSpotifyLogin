import { Component } from '@angular/core';
// import * as crypto from 'crypto';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor() {
  };
  clientId = '6605bd9473344191a66caee21afaa298';
  redirectUrl = 'http://localhost:4200/callback';
  authorizationEndpoint = "https://accounts.spotify.com/authorize";
  scope = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state';
  // generateRandomString(length : number) {
  //   return crypto.getRandomValues()
  //   .randomBytes(60)
  //   .toString('hex')
  //   .slice(0, length);
  // };
  async redirectToSpotifyAuthorize() {
    // const randomString = this.generateRandomString(64);
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
  
    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
  
    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  
    window.localStorage.setItem('code_verifier', code_verifier);

    const authUrl = new URL(this.authorizationEndpoint)
    const params = {
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: this.redirectUrl,
    };
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }
}
