# Nemo Cucumber.js Selenium Framework

***BDD Selenium Framework that integrates Cucumber.js with Nemo.js & also integrates SauceLabs for multi platform support***

[![Build Status][dependency]][dependency] [![Code Climate][codeclimate-svg]][codeclimate]

# About this framework

* Cucumber integrated with Nemo
* Runs Cucumber Scenarios on Sauce Labs - supports more than 800+ browsers/platforms combinations
* Runs all scenarios in Parallel - regress your app in few minutes
* Page-Object framework - Abstracts your Selenium UI pages & easy to maintain
* Pretty HTML reporting & Jenkins supported
* Automatic Screenshot Captures when scenario fails
* Multi-browsers runs for your UI tests. It can run your scenarios parallel on more than one browsers including Mobile & Desktop browsers
* Many more...

# Very Easy to start writing your scenarios
    
Pre-req: npm@3 or greater

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