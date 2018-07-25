import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function _window(): any {
   return window;
}

@Injectable()
export class WindowService {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  nativeWindow(): any {
      return _window();
  }

  /**
   * Load Javascript function.
   * @param url  Name of script.
   * @param implementationCode  callback function.
   * @param location  where to append the file
   * @param env  `This` variable of the environment
   */
  loadJS(url, implementationCode, location, env) {
    const SCRIPT_TAG = this.document.createElement('script');
    SCRIPT_TAG.src = url;

    SCRIPT_TAG.onload = () => {
      implementationCode(env);
    };
    location.appendChild(SCRIPT_TAG);
  }

  /**
   * Download File function.
   * @param data  Contents for the file being generated.
   * @param filename  Name for the file being generated.
   * @param type for  the file being generated.
   * @param callback  callback function
   */
  downloadFile(data: any, filename = 'data.csv', params = { type: 'text/csv' }, callback = () => {}) {
    const BLOB = new Blob([data.body], params);
    const URL = window.URL.createObjectURL(BLOB);
    const ATAG = document.createElement('a');
    ATAG.href = URL;
    ATAG.download = filename;
    this.document.body.appendChild(ATAG);
    ATAG.click();
    this.document.body.removeChild(ATAG);
    callback();
  }
}
