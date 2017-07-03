var browserLogs = require('protractor-browser-logs');
 
describe('loginpage', function() {
  
  var logs;
 
  beforeEach(function () {
    
  });
 
  afterEach(function () {
    
  });

  it('login success', function() {
    browser.ignoreSynchronization = true;
    browser.get('https://predix-asset-modeler-ui-aw-mvp3-dev.run.aws-usw02-pr.ice.predix.io');
    loginPage.setTenat('aw-mvp3-dev');
    loginPage.takeScreenShot('Tenantlogin.png');
    loginPage.clickSignInTenant();
    loginPage.setName('johnsmith ');
    loginPage.setPassword('bcs');
    loginPage.clickLogin();
    
  });
});