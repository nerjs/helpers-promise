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

// -----
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

// -----
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
