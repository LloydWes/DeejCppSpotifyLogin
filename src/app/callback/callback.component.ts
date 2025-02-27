import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-callback',
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  public refresh_token = null;
  public token = null;
  public success : Boolean = false;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      let res = this.getToken(params['code']);
      res.then(resp => resp.json())
      .then(respon=>{
        if (!respon.error) {
          console.log(respon);
          this.token = respon.access_token;
          this.refresh_token = respon.refresh_token;
          this.success = true;
        }
        });
    });
    
  }

  // Soptify API Calls
  getToken(code : string) {
    let truc = localStorage.getItem('code_verifier');
    let code_verifier = "truc"; 
    if (truc) {
      code_verifier = truc;
    }
    let tokenEndpoint : string = "https://accounts.spotify.com/api/token";
    let clientId : string = '6605bd9473344191a66caee21afaa298';
    let redirectUrl: string = 'http://localhost:4200/callback';

    const response = fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: code_verifier,
      }),
    });

    return response;
  }

  refreshToken() {
    let tokenEndpoint : string = "https://accounts.spotify.com/api/token";
    let clientId : string = '6605bd9473344191a66caee21afaa298';
    const response = fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: String(this.refresh_token)
      }),
    });
    // let re = await respose.json();
    // if (!re.error) {
    //   console.log(re);
    //   this.token = re.access_token;
    //   this.refresh_token = re.refresh_token;
    //   this.success = true;
    // } else {
    //   this.success = false;
    // }
    response.then(res => res.json())
    .then(respon => {
      if (!respon.error) {
        console.log(respon);
        this.token = respon.access_token;
        this.refresh_token = respon.refresh_token;
        this.success = true;
      } else {
        this.success = false;
      }
    })
  }
}


