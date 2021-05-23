const DeferPromise = require('../defer')

describe('Defer', () => {
  test('is Promise', () => {
    expect(new DeferPromise()).toBeInstanceOf(Promise)
  })

  test('outside methods', () => {
    let resolveMethod, rejectMethod
    const defer = new DeferPromise((resolve, reject) => {
      resolveMethod = resolve
      rejectMethod = reject
    })

    expect(resolveMethod).toStrictEqual(defer.resolve)
    expect(rejectMethod).toStrictEqual(defer.reject)
  })

  test('using native Promise', () => {
    let promise
    promise = new DeferPromise(resolve => resolve('result'))

    expect(promise).resolves.toEqual('result')

    promise = new DeferPromise((_, reject) => reject(new Error('error')))

    expect(promise).rejects.toThrow('error')
  })

  test('using defer Promise', () => {
    let promise
    promise = new DeferPromise()
    promise.resolve('result')

    expect(promise).resolves.toEqual('result')

    promise = new DeferPromise()
    promise.reject(new Error('error'))

    expect(promise).rejects.toThrow('error')
  })
})
