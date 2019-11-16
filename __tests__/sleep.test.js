const sleep = require('../sleep')

jest.useFakeTimers()

describe('Sleep', () => {
    test('test delay', () => {
        const promise = sleep(10)

        expect(promise).toBeInstanceOf(Promise)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10)

        jest.runOnlyPendingTimers()

        expect(promise).resolves.toBeUndefined()
    })
})
