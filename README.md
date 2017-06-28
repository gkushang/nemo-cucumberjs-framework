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

$ git clone https://github.com/gkushang/nemo-cucumberjs-framework
$ cd nemo-cucumberjs-framework
$ npm i

```

## Run

### Run on single browser locally

Default browser is `firefox`

``` bash
$ grunt acceptance
```

To run on Chrome locally, 

``` bash
$ BROWSER=chrome grunt acceptance
```

N.B.: Please make sure the `chromedriver` is available at your $PATH

### Run on Sauce Labs browser

``` bash
$ SAUCE=iPhone grunt acceptance
```

### Run Features in Parallel mode

``` bash
$ SAUCE=chrome grunt acceptance --executeParallel true 
```

### Run Scenarios in Parallel mode

``` bash
$ SAUCE=chrome grunt acceptance --executeParallel true --parallel scenarios 
```

### Run on multiple browsers in Parallel mode

``` bash
$ SAUCE=chrome,firefox,ie10 grunt acceptance --executeParallel true 
```

## Sauce Labs Dashboard

To view your regression suite to unique Sauce Labs dashboard, please provide unique `BUILD` id while running your tests

``` bash
$ BUILD="`date`" SAUCE=chrome grunt acceptance --executeParallel true --parallel scenarios 
```

### Run Single test from suite

``` bash
$ grunt acceptance --tags @loginSuccess
```

## Sauce Labs browsers

They are configured at `acceptance/config/sauce.json` - update/add browser/platform as per your need

## Cucumber Features & Step Definitions

Add your features under `acceptance/features` & step definitions under `acceptance/step_definitions`

## Sample Cucumber Report
![Alt text](/acceptance/report/sampleCucumberReport.png "Sample Report")

[dependency]: https://david-dm.org/gkushang/nemo-cucumberjs-framework.svg
[codeclimate-svg]: https://codeclimate.com/github/gkushang/cucumber-html-reporter/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/gkushang/cucumber-html-reporter