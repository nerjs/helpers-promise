const asyncInterval = require('../interval')
const sleep = require('../sleep')

describe('Interval', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('use native interval', async () => {
    const callback = jest.fn()
    const stop = asyncInterval(callback, 50)

    jest.runOnlyPendingTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)

    jest.useRealTimers()
    callback.mockRestore()
    await sleep(220)

    expect(callback).toHaveBeenCalledTimes(4)
    stop()
  })

  test('use async interval', async () => {
    jest.useRealTimers()
    const callback = jest.fn()
    const asyncCallback = async () => {
      await sleep(50)
      callback()
    }

    const stop = asyncInterval(asyncCallback, 50)

    await sleep(250)
    expect(callback).toHaveBeenCalledTimes(2)

    stop()
  })

  test('error handler', async () => {
    jest.useRealTimers()
    const errorCallback = jest.fn()
    const testError = new Error('Test')
    const stop = asyncInterval(
      async () => {
        throw testError
      },
      errorCallback,
      10,
    )

    await sleep(10)

    expect(errorCallback).toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalledTimes(1)

    expect(errorCallback).toHaveBeenCalledWith(testError)

    stop()
  })

  test('stop interval', () => {
    const callback = jest.fn()

    const stop = asyncInterval(callback, 10)
    stop()
    jest.runOnlyPendingTimers()

    expect(callback).not.toHaveBeenCalled()
  })
})
