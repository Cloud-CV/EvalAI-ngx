import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingH3Text() {
    return element(by.css('app-root app-home h3')).getText();
  }
  getSignupButton() {
    return element(by.css('[routerlink="/auth/signup"]')).getText();
  }
}
