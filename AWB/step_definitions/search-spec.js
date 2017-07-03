// Team_Example Login
module.exports = function () {

    // this.APMLogin = function () {
    this.When(/^I click to Search Icon$/, function (callback) {
        browser.ignoreSynchronization = true;
        homePage.searchIcon().then(function () {
            callback();
        });
    });

    this.Then(/^I should see the search page$/, function (callback) {
        browser.ignoreSynchronization = true;
        searchPage.getPage().then(function (completed) {
            assert.isTrue(completed, 'Not In Search Page');
            var EC = protractor.ExpectedConditions;
            var el = element(by.xpath('//*[@id="left-panel"]/div[1][contains(@style, "display: none")]'));
            browser.wait(EC.visibilityOf(el), 10000);
            callback();
        });
    });

    this.When(/^I put query to query field(.*)$/, function (query, callback) {
        browser.ignoreSynchronization = true;
        query = browser.params.login.query;
        browser.ignoreSynchronization = true;
        searchPage.setQuery(query).then(function () {
            callback();

        });
    });

    this.When(/I click Query button$/, function (callback) {
        browser.ignoreSynchronization = true;
        searchPage.clickRunQueryButton().then(function () {
            callback();
        });

    });

    this.Then(/^I should see data$/, function (callback) {
        browser.ignoreSynchronization = true;
        searchPage.getData().then(function (completed) {
            assert.isTrue(completed, 'No Data is shown');
            callback();
        });

    });

};









