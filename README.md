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
* Default browser is `chrome`, but you can change with ENV variable `BROWSER` to run locally on your required browser.

##### Setup SauceLabs

* Add your SauceLabs Username and AccessKey at [config.json][config-json]
* Update/Edit SauceLabs browsers & platform at [sauce.json][sauce] as per your need.

#### Run

##### Locally

Default browser is `chrome`, to run on `firefox` or any other browser locally

```$xslt
    
    BROWSER=firefox grunt acceptance
    
```

##### SauceLabs

SauceLabs browsers are available at [sauce.json][sauce]. Pick any one browser combination and pass it as a _SAUCE_ param. `BUILD` param will create a pretty dashboard on Sauce for your respective test run.

```$xslt
    
    $ SAUCE=iPhone BUILD="`date`" grunt acceptance
    
```

_BROWSER_ param is to run tests locally, while _SAUCE_ is to run SauceLabs


##### Parallel

Run any any platform, _SAUCE_ or _BROWSER_. 
  
###### Parallel Scenarios

e.g. Below command will run your Scenarios in parallel on Chrome browser on SauceLabs.

```$xslt

    $ SAUCE=chrome grunt acceptance --parallel scenarios 

```

###### Parallel Features

```$xslt

    $ SAUCE=chrome grunt acceptance --parallel features 

```

#### Run Multiple Browsers in Parallel on SauceLabs

e.g. Run all your scenarios in parallel on Chrome, Firefox and ie10 browsers

```$xslt

    $ SAUCE=chrome,firefox,ie10 grunt acceptance --parallel features
     
```

#### Run single Tag

```$xslt

    $ grunt acceptance --tags @yourTag
    
```


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