# ProUI

## Installation Instructions
           
1) 	Should have Github account

2) 	Send your SSO to '@Research Automation Team' to provide an access to the repo

3) 	Open new terminal and clone repo from GitHub to the local system
```
git clone git@github.build.ge.com:MicroTester/ProUI.git
```

4)	 Open IDE (WebStorm) and select File-> Open and navigate to cloned Project

5) Run the commands below to install all the required dependencies:
```
	npm install -g grunt --proxy=http://proxy-src.research.ge.com:8080
	npm config set strict-ssl false   
	npm install --only=dev --proxy=http://proxy-src.research.ge.com:8080
```

6) Cd in your project directory.

7)	In order to run the default test built with this framework run:
```
	grunt
```

8)	Run your test without suite name:
```
	grunt noSuite --conf= <path of conf file>
```
 
9)	Run your test with a specific suite:
```
	grunt test --conf= <path of conf file> --suite= <name of suite>
``` 

## Key Things to Note:
Cucumber is no longer included by default as of version 3.0. You can integrate Cucumber with Protractor with the custom framework option. 


Change framework from “cucumber” to “custom” and add the new framework path


Documentation: https://devcloud.swcoe.ge.com/devspace/display/KKQTL/ProUI



 
