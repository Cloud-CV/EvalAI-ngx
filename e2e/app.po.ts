import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingH1Text() {
    return element(by.css('app-home h1')).getText();
  }
}
