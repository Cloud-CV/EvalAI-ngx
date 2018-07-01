import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';

@Injectable()
export class ApiService {
  API = environment.api_endpoint;
  HEADERS = { 'Content-Type': 'application/json' };
  HTTP_OPTIONS: any;
  constructor(private http: HttpClient, private globalService: GlobalService) { }

  prepareHttpOptions() {
    const TOKEN = this.globalService.getAuthToken();
    if (TOKEN) {
      this.HEADERS['Authorization'] = 'Token ' + TOKEN;
    } else {
      delete this.HEADERS['Authorization'];
    }
    this.HTTP_OPTIONS = {
      headers: new HttpHeaders(this.HEADERS)
    };
  }

  getUrl(path: string) {
    this.prepareHttpOptions();
    return this.http.get(this.API + path, this.HTTP_OPTIONS);
  }

  postUrl(path: string, body: string) {
    this.prepareHttpOptions();
    return this.http.post(this.API + path, body, this.HTTP_OPTIONS);
  }

  appendHeaders(headers) {
    // TODO: Add Headers to this.HEADERS and update this.HTTP_OPTIONS
  }
}
