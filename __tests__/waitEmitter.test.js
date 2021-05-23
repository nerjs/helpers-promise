const Events = require('events')

const waitEmitter = require('../waitEmitter')

describe('wait Emitter', () => {
  let emitter

  beforeEach(() => {
    emitter = new Events()
  })

  it('validate', () => {
    expect(() => {
      waitEmitter(emitter)
    }).toThrow('resolve')

    expect(() => {
      waitEmitter('emitter')
    }).toThrow('emitter')
  })

  it('resolve', async () => {
    setImmediate(() => emitter.emit('test', 'qwerty'))
    await expect(waitEmitter(emitter, 'test')).resolves.toEqual('qwerty')

    setImmediate(() => emitter.emit('test1', 'qwerty'))
    await expect(waitEmitter(emitter, ['test1', 'test2'])).resolves.toEqual('qwerty')

    setImmediate(() => emitter.emit('test2', 'qwerty'))
    await expect(waitEmitter(emitter, ['test1', 'test2'])).resolves.toEqual('qwerty')
  })

  it('reject', async () => {
    setImmediate(() => emitter.emit('test', new Error('qwerty')))
    await expect(waitEmitter(emitter, 'resolve', 'test')).rejects.toThrow('qwerty')

    setImmediate(() => emitter.emit('test1', new Error('qwerty')))
    await expect(waitEmitter(emitter, 'resolve', ['test1', 'test2'])).rejects.toThrow('qwerty')

    setImmediate(() => emitter.emit('test2', new Error('qwerty')))
    await expect(waitEmitter(emitter, 'resolve', ['test1', 'test2'])).rejects.toThrow('qwerty')
  })

  it('timeout error', async () => {
    jest.useFakeTimers()
    const promise = waitEmitter(emitter, 'resolve', 'reject', 5000)
    jest.runTimersToTime(5000)
    await expect(promise).rejects.toThrow('Timeout')

    const promise2 = waitEmitter(emitter, 'resolve', 5000)
    jest.runTimersToTime(5000)
    await expect(promise2).rejects.toThrow('Timeout')
  })
})
