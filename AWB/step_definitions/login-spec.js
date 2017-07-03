// Team_Example Login
module.exports = function () {

    // this.APMLogin = function () {
    this.Given(/^I choose a tenant(.*)$/, function (env, callback) {
        env = browser.params.login.baseUrl;
        tenantPage.getLogin(env).then(function (completed) {
            assert.isTrue(completed, 'Not login page');
            callback();
        });
    });

    this.When(/^I authenticate with a valid tenant (.*)$/, function (tenantname, callback) {
        browser.ignoreSynchronization = true;
        tenantName = browser.params.login.tenantname;
        tenantPage.setTenat(tenantName).then(function () {
            tenantPage.clickSignInTenant().then(function () {
                loginPage.getLogin().then(function (completed) {
                    assert.isTrue(completed, 'Not login page');
                    callback();
                });
            });

        });
    });


    this.When(/^I authenticate with valid (.*) and (.*)$/, function (userName, password, callback) {
        browser.ignoreSynchronization = true;
        userName = browser.params.login.username;
        password = browser.params.login.password;
        loginPage.setName(userName).then(function () {
            loginPage.setPassword(password).then(function () {
                loginPage.clickLogin().then(function () {
                    callback();
                });
            });
        });

    });

    this.When(/^I authenticate with invalid (.*) and (.*)$/, function (userName, password, callback) {
        browser.ignoreSynchronization = true;
        userName = browser.params.login.Iusername;
        password = browser.params.login.password;
        loginPage.setName(userName).then(function () {
            loginPage.setPassword(password).then(function () {
                loginPage.clickLogin().then(function () {
                    callback();
                });
            });
        });

    });

    this.Then(/^I should see the home page$/, function (callback) {
        browser.ignoreSynchronization = true;
        loginPage.checkLogin().then(function (completed) {
            assert.isTrue(completed, 'Not logged in');
            callback();
        });
    });

    this.When(/^I Logout$/, function (callback) {
        browser.ignoreSynchronization = true;
        homePage.clickUsername().then(function () {
            homePage.clickLogOut().then(function () {
                callback();
            })
        });
    });

    this.Then(/^I should see tenant page$/, function (callback) {
        browser.ignoreSynchronization = true;
        tenantPage.getPage().then(function (completed) {
            assert.isTrue(completed, 'Not logged in');

            callback();
        });

    });

    this.Then(/^I should see the tenant page$/, function (callback) {
        browser.ignoreSynchronization = true;
        tenantPage.getPage().then(function (completed) {
            assert.isTrue(completed, 'Not logged in');
            callback();
        });

    });

    this.Then(/^I should see the an error message$/, function (callback) {
        browser.ignoreSynchronization = true;
        loginPage.errorMSG().then(function (completed) {
            assert.isTrue(completed, 'Not logged out');
            callback();
        });

    });

};









