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

    var buffer = new Buffer('ingestor.12f037011a4d4892903b9cb8f1d0d446:');
    var base64s = buffer.toString('base64');
    Logger.info(base64s);

    var adminUserOpts = {
        url: 'https://91069a10-02cc-41e3-a325-e34b2539905a.predix-uaa.run.asv-pr.ice.predix.io/oauth/token',
        headers:{
            'Authorization': 'Basic ' + base64s,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:{
            'grant_type' : 'password',
            'username' : '4EAE92DABCF643C4BACF9D976B5A2E81_ingestor',
            'password' : 'Pa55w0rd'
        }
    }

    this.Given(/^All information provided and I will generate all the data$/, function (callback) {
        RestHelper.getAccessToken(adminUserOpts.url, adminUserOpts.headers, adminUserOpts.body,function(err, token){
            console.log("token is " + token)



            var opts = {
                url: 'https://apm-timeseries-services-qa2.run.asv-pr.ice.predix.io/v1/data',
                headers: {
                    'tenant': '4EAE92DABCF643C4BACF9D976B5A2E81',
                    'Authorization': 'Bearer ' + token
                }
            };
            var url = 'https://apm-timeseries-services-qa2.run.asv-pr.ice.predix.io/v1/data?operation=interpolated&responseFormat=KairosDB&tagList=AVD-CHART-ASSET-CHILD02-ID.EXHAUST_TEMP_T48A_EE-43-TI-11243A_Actual_Smoothed_id,AVD-CHART-ASSET-CHILD02-ID.EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual_Smoothed_id,AVD-CHART-ASSET-CHILD02-ID.EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual_id,AVD-CHART-ASSET-CHILD02-ID.EXHAUST_TEMP_T48A_EE-43-TI-11243A_Estimate_id&startTime=2016-07-11T05%3A00%3A00.000&endTime=2016-07-14T05%3A00%3A00.000&sampleCount=300';
            RestHelper.executeGetRequest(url, opts.headers, function (err, res) {
                //console.log(JSON.stringify(res.body.sample_size))



                var jres = JSON.stringify(res.body)
                //console.log(jres);
                console.log(JSON.parse(jres).queries.length)
                var len = JSON.parse(jres).queries.length

                var res = new Array()
                for(var i = 0; i< len;){
                    var test = JSON.parse(jres).queries[i].results[0].values
                    var name = JSON.parse(jres).queries[i].results[0].name
                    var testlen = test.length
                    for(var a = 0; a<testlen;){
                        test[a][1] = name+":"+ test[a][1]
                        a++
                        if(a === testlen){
                            if(res.length === 0){
                                res = test
                                i++
                                if(i === len){
                                    console.log(res)
                                    callback()
                                }
                            }else{
                                for(var j = 0; j<testlen;){
                                    var index = test[j].indexOf(res[j][0])
                                    test[j].splice(index, 1)
                                    res[j] = res[j].concat(test[j])
                                    j++
                                    if( j === testlen){
                                        i++
                                        if(i === len){
                                            console.log(res)
                                            for(var k = 0; k< res.length;){
                                                res[k][0] += 7*60*60*1000
                                                res[k][0] = new Date(res[k][0]).toLocaleString()
                                                res[k][0] = res[k][0].replace(/,/g, "")
                                                k++
                                                if(k === res.length){
                                                    var finalres = res.join("\n")
                                                    fs.writeFile("./RestData.csv", finalres, function (err) {
                                                        if (err)console.log(err);
                                                    })
                                                    callback()
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }


                }


            });

        });
    });
};
module.exports = myStepDefinitionsWrapper;