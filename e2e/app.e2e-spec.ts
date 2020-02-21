import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('evalai App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingH3Text()).toEqual('Evaluating state-of-the-art in AI');
  });

  it('should display signup button', () => {
    page.navigateTo();
    expect(page.getSignupButton()).toEqual('Sign Up');
  });

});
