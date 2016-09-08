# nemo-cucumberjs-framework


## Install

``` bash
npm i --registry http://npm.paypal.com
```

## Run

### Run on single browser locally

``` bash
$ grunt acceptance
```

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

## Sauce Labs browsers

They are configured at `acceptance/config/sauce.json` - update/add browser/platform as per your need



