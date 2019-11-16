# helpers-promise 


## install 
```
npm i helpers-promise
```
or
```
yarn add helpers-promise
```

## modules

### sleep

```js
const sleep = require('helpers-promise/sleep');
// or:
const { sleep } = require('helpers-promise');

await sleep(Number)
```

```js
(async () => {
    console.time('test sleep')
    await sleep(1000)
    console.timeEnd('test sleep') // ~1000ms
})()
```

### defer 

```js
const DeferPromise = require('helpers-promise/defer');
// or:
const { DeferPromise } = require('helpers-promise');

// use:
new DeferPromise([executor])
```

```js
const defer = new DeferPromise()

defer.then(result => {
    console.log('result', result)
}).catch(error => {
    console.log('error', error.message)
})

// -----
defer.resolve(1) // console: result 1
// or 
defer.reject(new Error(2)) // console: error 2
```

### asyncInterval 

```js
const asyncInterval = require('helpers-promise/interval');
// or:
const { asyncInterval } = require('helpers-promise');

// use
asyncInterval(callback, [errorCallback], [time])
```

```js
asyncInterval(async () => {
    // the next timer does not start until the promise returned by the current function is completed
    await sleep(1000)
}, 1000) // interval ~2000ms

// error handler
asyncInterval(async () => {
    throw new Error('Test error')
}, err => {
    console.log(err.message) // console: Test error
}, 1000)
```
