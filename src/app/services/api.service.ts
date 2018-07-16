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

  prepareHttpOptions(fileHeaders = false) {
    const TOKEN = this.globalService.getAuthToken();
    if (TOKEN) {
      this.HEADERS['Authorization'] = 'Token ' + TOKEN;
    } else {
      delete this.HEADERS['Authorization'];
    }
    const TEMP = Object.assign({}, this.HEADERS);
    if (fileHeaders) {
      delete TEMP['Content-Type'];
    }
    this.HTTP_OPTIONS = {
      headers: new HttpHeaders(TEMP)
    };
  }

  getUrl(path: string, isJson = true) {
    if (isJson) {
      this.prepareHttpOptions();
      return this.loadingWrapper(this.http.get(this.API + path, this.HTTP_OPTIONS));
    } else {
      this.prepareHttpOptions(true);
      const TEMP = Object.assign({}, this.HTTP_OPTIONS, { observe: 'response', responseType: 'text' });
      return this.loadingWrapper(this.http.get(this.API + path, TEMP));
    }
  }


  postUrl(path: string, body: any) {
    this.prepareHttpOptions();
    debugger;
    return this.loadingWrapper(this.http.post(this.API + path, body, this.HTTP_OPTIONS));
  }

  postFileUrl(path: string, formData: any) {
    this.prepareHttpOptions(true);
    return this.loadingWrapper(this.http.post(this.API + path, formData, this.HTTP_OPTIONS));
  }

  deleteUrl(path: string) {
    this.prepareHttpOptions();
    return this.loadingWrapper(this.http.delete(this.API + path, this.HTTP_OPTIONS));
  }

  loadingWrapper(httpCall) {
    const SELF = this;
    setTimeout(this.globalService.toggleLoading(true), 100);
    let success = (params) => {};
    let error = (params) => {};
    let final = () => {};
    const RETURN_WRAPPER = {
      subscribe: (fa, fb, fc) => {
        success = fa;
        error = fb;
        final = fc;
      }
    };
    httpCall.subscribe(
      (data) => {
        success(data);
      },
      (err) => {
        setTimeout(this.globalService.toggleLoading(false), 100);
        error(err);
      },
      () => {
        setTimeout(this.globalService.toggleLoading(false), 100);
        final();
      }
    );
    return RETURN_WRAPPER;
  }

  appendHeaders(headers) {
    // TODO: Add Headers to this.HEADERS and update this.HTTP_OPTIONS
  }
}
