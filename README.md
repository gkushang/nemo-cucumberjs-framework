# nemo-cucumberjs-framework
> Sample framework that integrates Cucumber.js with Nemo & also integrates SauceLabs for multi platform support
> Clone, install and add your features to start with

## Install

``` bash

$ git clone git@github.paypal.com:kugajjar/nemo-cucumberjs-framework.git
$ cd nemo-cucumberjs-framework
$ npm i --registry http://npm.paypal.com

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
$ SAUCE=chrome grunt acceptance --executeParalle true 
```

### Run Scenarios in Parallel mode

``` bash
$ SAUCE=chrome grunt acceptance --executeParalle true --parallel scenarios 
```

### Run on multiple browsers in Parallel mode

``` bash
$ SAUCE=chrome,firefox,ie10 grunt acceptance --executeParalle true 
```

### Run Single test from suite

``` bash
$ grunt acceptance --tags @loginSuccess
```

## Sauce Labs browsers

They are configured at `acceptance/config/sauce.json` - update/add browser/platform as per your need

## Cucumber Features & Step Definitions

Add your features under `acceptance/features`
Add your step definitions under `acceptance/step_definitions`

## Sample Cucumber Report
![Alt text](/acceptance/report/sampleCucumberReport.png "Sample Report")

