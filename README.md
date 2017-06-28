# Nemo Cucumber.js Selenium Framework

***BDD Selenium Framework that integrates Cucumber.js with Nemo.js & SauceLabs Cloud***

[![Build Status][dependency]][dependency] [![Code Climate][codeclimate-svg]][codeclimate]

## Framework Features

* [Cucumber][cucumberjs] BDD Framework
* Supports latest Selenium 3 & Cucumber 2
* Pretty [HTML reports][html-report] with Pie-charts
* [Parallel][parallel] Executions of Cucumber Scenarios and/or Features
* Selenium [Page Objects][page-objects]; auto initialized 
* Multi-browsers/platforms coverage with SauceLabs
* [Parallel MultiBrowsers][replicate] executions, e.g. runs X number of scenarios on more than one browsers, all in parallel
* [Nemo][nemo], a PayPal's open source Selenium Framework
* Grunt Tasks to run Smoke, P1 and/or Acceptance tests

## Very simple to use
    
``` bash

$ brew install chromedriver geckodriver
$ git clone https://github.com/gkushang/nemo-cucumberjs-framework
$ cd nemo-cucumberjs-framework
$ npm i
$ grunt acceptance //will run a scenario and launch HTML report

```
 
#### Add new Cucumber Features
 
1. Add new features under [acceptance/features][features-path] 
2. Add step definitions under [acceptance/step_definitions][stepdefinitions-path]

#### About

* It's a framework with [grunt task][gruntfile].  
* Default browser is `chrome`, but you can change with ENV variable `BROWSER` to run locally on your required browser, e.g. `BROWSER=firefox` to run tests on `firefox`.
* Update SauceLabs Key and AccessKey at [config.json][config-json]
* SauceLabs browser versions/platforms can be configured at [sauce.json][sauce]. Update/Add browser/platform as per your need.


## Sample Cucumber Report
![Alt text](/acceptance/report/sampleCucumberReport.png "Sample Report")

[dependency]: https://david-dm.org/gkushang/nemo-cucumberjs-framework.svg
[codeclimate-svg]: https://codeclimate.com/github/gkushang/cucumber-html-reporter/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/gkushang/cucumber-html-reporter
[gruntfile]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/Gruntfile.js
[sauce]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/acceptance/config/sauce.json
[cucumberjs]: https://github.com/cucumber/cucumber-js
[nemo]: http://nemo.js.org
[html-report]: https://github.com/gkushang/cucumber-html-reporter
[parallel]: https://github.com/gkushang/cucumber-parallel
[page-objects]: https://github.com/gkushang/nemo-pageobjects
[replicate]: https://github.com/gkushang/cucumber-replicate
[features-path]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/acceptance/features
[stepdefinitions-path]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/acceptance/step_definitions
[config-json]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/acceptance/config/config.json