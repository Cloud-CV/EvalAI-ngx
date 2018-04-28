import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingH1Text() {
    return element(by.css('app-root app-home .home_container .header_container .section_title_div span')).getText();
  }
  getHeadingPartners() {
    return element(by.css('app-root app-home .partner_container .row .section_title')).getText();
  }
  getHeadingChallenges() {
    return element(by.css('app-root app-home .challenges_container .row .section_title')).getText();
  }

}
