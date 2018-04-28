import { AppPage } from './app.po';

describe('evalai App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingH1Text()).toEqual('EvalAI');
  });

  it('should display partners title', () => {
    page.navigateTo();
    expect(page.getHeadingPartners()).toEqual('Who uses EvalAI?');
  });

  it('should display challenges title', () => {
    page.navigateTo();
    expect(page.getHeadingChallenges()).toEqual('Featured Challenges');
  });

});
