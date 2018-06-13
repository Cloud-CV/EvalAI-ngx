import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {
  API = environment.api_endpoint;
  constructor(private http: HttpClient) { }

  getUrl(path: string) {
    return this.http.get(this.API + path);
  }

  postUrl(path: string, body: string) {
    return this.http.post(this.API + path, body, httpOptions);
  }
}
