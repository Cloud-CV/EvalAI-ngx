import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function _window(): any {
   return window;
}

@Injectable()
export class WindowService {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  get nativeWindow(): any {
      return _window();
  }
  loadJS(url, implementationCode, location, env) {
    const SCRIPT_TAG = this.document.createElement('script');
    SCRIPT_TAG.src = url;

    SCRIPT_TAG.onload = () => {
      implementationCode(env);
    };
    location.appendChild(SCRIPT_TAG);
  }
  downloadFile(data: any, params = { type: 'text/csv' }) {
    const BLOB = new Blob([data], params);
    var url= _window().URL.createObjectURL(BLOB);
    _window().open(url);
  }
}
