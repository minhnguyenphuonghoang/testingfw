var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {
    'use strict';

    var fs = require('fs');
    var rStream = fs.createReadStream(path.resolve(__dirname, '../TestData/user.json'));
    var data = '';
    rStream.setEncoding('utf8');
    rStream.on('data', function(chunk) {
        data+=chunk;
    });
    rStream.on('end', function() {
        Logger.info('Read user data');
        Logger.info(data);
    });

    var buffer = new Buffer('ingestor.7fd4b91593c34c0e8f4bac2084131a79:');
    var base64s = buffer.toString('base64');
    Logger.info(base64s);

    var adminUserOpts = {
        url: 'https://4ebc5a24-c5ec-481e-a371-57ce006de141.predix-uaa-staging.grc-apps.svc.ice.ge.com/oauth/token',
        headers:{
            'Authorization': 'Basic ' + base64s,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:{
            'grant_type' : 'password',
            'username' : 'acs0516-admin',
            'password' : 'test'
        }
    }

    this.Given(/^A user is created$/, function (callback) {
        RestHelper.getAccessToken(adminUserOpts.url, adminUserOpts.headers, adminUserOpts.body,function(err, token){
            var opts = {
                url: 'http://apm-user-management-qa.grc-apps.svc.ice.ge.com/services/v1/umgmt/users',
                headers: {
                    'Content-Type': 'application/json',
                    'tenant':'4D37997D31354D36A40FBBF9AADB4BE0',
                    'Authorization':'bearer ' +  token
                },
                body : data
            };
            RestHelper.executePostRequest(opts.url, opts.headers, opts.body, function(err, res){
                Logger.info("Created user : " + JSON.stringify(res.body));
                console.log("Created user : " + JSON.stringify(res.body));
                callback();
            });
        });
    });

    this.Then(/^I can retrieve the user and delete the user$/, function (callback) {
        RestHelper.getAccessToken(adminUserOpts.url, adminUserOpts.headers, adminUserOpts.body, function (err, token) {
            //console.log("TOKEN=" + token);
            var opts = {
                url: 'http://apm-user-management-qa.grc-apps.svc.ice.ge.com/services/v1/umgmt/users',
                headers: {
                    'Content-Type': 'application/json',
                    'tenant': '4D37997D31354D36A40FBBF9AADB4BE0',
                    'Authorization': 'bearer ' + token
                }
            };
            var url = 'http://apm-user-management-qa.grc-apps.svc.ice.ge.com/services/v1/umgmt/users?username=tobedeleted';
            RestHelper.executeGetRequest(url, opts.headers, function (err, res) {
                var uuid = JSON.parse(JSON.stringify(res.body)).dataObject[0].uuid;
                console.log('Found user : ' + uuid);
                Logger.info('Found user : ' + uuid);
                RestHelper.executeDeleteRequest(opts.url + '/' + uuid, opts.headers, function (err, res) {
                    Logger.info('Deleted user : ' + uuid);
                    console.log('Deleted user : ' + uuid);

                    callback();
                });
            });
        });
    });
};
module.exports = myStepDefinitionsWrapper;