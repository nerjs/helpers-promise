/**
 *
 * @param {Object} emitter Instance EventEmitter
 * @param {String|String[]} resolveTrigger
 * @param {String|String[]} [rejectTrigger]
 * @param {Number} [timeout]
 */
const waitEmitter = (emitter, resolveTrigger, rejectTrigger, timeout) => {
  const resolveTriggers = Array.isArray(resolveTrigger)
    ? resolveTrigger
    : typeof resolveTrigger === 'string'
    ? [resolveTrigger]
    : []
  const rejectTriggers = Array.isArray(rejectTrigger)
    ? rejectTrigger
    : typeof rejectTrigger === 'string'
    ? [rejectTrigger]
    : []

  const timeoutError = typeof timeout === 'number' ? timeout : typeof rejectTrigger === 'number' ? rejectTrigger : null

  if (
    !emitter ||
    !emitter.once ||
    typeof emitter.once !== 'function' ||
    !emitter.removeListener ||
    typeof emitter.removeListener !== 'function'
  )
    throw new Error('Incorrect emitter object')
  if (!resolveTriggers.length) throw new Error('At least one resolve trigger is required ')

  return new Promise((resolve, reject) => {
    let tid, resolveHandler, rejectHandler

    const clear = () => {
      if (timeoutError) clearTimeout(tid)
      resolveTriggers.forEach(trigger => emitter.removeListener(trigger, resolveHandler))
      rejectTriggers.forEach(trigger => emitter.removeListener(trigger, rejectHandler))
    }

    if (timeoutError) {
      tid = setTimeout(() => {
        clear()
        reject(new Error(`Timeout Error. Expired ${timeoutError}ms`))
      }, timeoutError)
    }

    resolveHandler = data => {
      clear()
      resolve(data)
    }

    rejectHandler = error => {
      clear()
      reject(error)
    }

    resolveTriggers.forEach(trigger => emitter.once(trigger, resolveHandler))
    rejectTriggers.forEach(trigger => emitter.once(trigger, rejectHandler))
  })
}

module.exports = waitEmitter
