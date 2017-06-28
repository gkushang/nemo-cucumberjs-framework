# Nemo Cucumber.js Selenium Framework

***BDD Selenium Framework that integrates Cucumber.js with Nemo.js & SauceLabs Cloud***

[![Build Status][dependency]][dependency] [![Code Climate][codeclimate-svg]][codeclimate]

## Framework Features

* Cucumber BDD Framework
* Supports latest Selenium 3 & Cucumber 2
* Pretty HTML reports with Pie-charts
* Parallel Executions of Cucumber Scenarios and/or Features
* Selenium Page Objects; auto initialized 
* Multi-browsers/platforms coverage with SauceLabs
* Parallel MultiBrowsers executions, e.g. runs X number of scenarios on more than one browsers, all in parallel
* Grunt Tasks to run Smoke, P1 and/or Acceptance tests

## Very simple to use
    
``` bash

$ brew install chromedriver geckodriver
$ git clone https://github.com/gkushang/nemo-cucumberjs-framework
$ cd nemo-cucumberjs-framework
$ npm i

```
 
#### Add new Cucumber Features
 
1. Add new features under `acceptance/features` 
2. Add step definitions under `acceptance/step_definitions`

#### Overview

* It's a grunt task, edit/update [gruntfile][gruntfile]. 
* Default browser is `chrome`, but you can change with ENV variable `BROWSER` to run locally on required browser.
* SauceLabs browser versions/platforms can be configured at [sauce.json][sauce]. Update/Add browser/platform as per your need.


## Sample Cucumber Report
![Alt text](/acceptance/report/sampleCucumberReport.png "Sample Report")

[dependency]: https://david-dm.org/gkushang/nemo-cucumberjs-framework.svg
[codeclimate-svg]: https://codeclimate.com/github/gkushang/cucumber-html-reporter/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/gkushang/cucumber-html-reporter
[gruntfile]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/Gruntfile.js
[sauce]: https://github.com/gkushang/nemo-cucumberjs-framework/blob/master/acceptance/config/sauce.json