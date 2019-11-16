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

(async () => {

    console.time('test sleep')
    await sleep(1000)
    console.timeEnd('test sleep') // ~1000ms

})()
```

