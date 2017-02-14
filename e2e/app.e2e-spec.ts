import { Ng2WordpressTestPage } from './app.po';

describe('ng2-wordpress-test App', function() {
  let page: Ng2WordpressTestPage;

  beforeEach(() => {
    page = new Ng2WordpressTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
