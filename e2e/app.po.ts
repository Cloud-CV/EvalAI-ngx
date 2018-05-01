import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingH1Text() {
    return element(by.css('app-root app-home .home_container .header_container .section_title_div span')).getText();
  }
}
