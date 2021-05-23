const createTimeDiff = (td, time) => {
  if (!td) return () => time
  const currentTime = Date.now()

  return () => {
    const difTime = Date.now() - currentTime
    return difTime > time ? 0 : time - difTime
  }
}

/**
 * @param {Function} callback
 * @param {Function} [errorCallback]
 * @param {Number} [time]
 * @param {Boolean} [timeDifference]
 * @returns {Function} stop interval
 */
const asyncInterval = (callback, errorCallback, time = 0, timeDifference) => {
  if (!callback || typeof callback !== 'function') throw new TypeError('Callback should be a function')

  let errorHandler = error => console.error(error)
  let timeTimeout = 0
  let td = false

  if (typeof errorCallback === 'function') {
    errorHandler = errorCallback
    timeTimeout = isNaN(Number(time)) ? timeTimeout : Number(time)
    td = !!timeDifference
  } else if (typeof errorCallback === 'number') {
    timeTimeout = isNaN(Number(errorCallback)) ? timeTimeout : Number(errorCallback)
    td = !!time
  }

  let tid

  const interval = async () => {
    const timeDiff = createTimeDiff(td, timeTimeout)

    try {
      await callback()
    } catch (err) {
      errorHandler(err)
    }

    tid = setTimeout(interval, timeDiff())
  }

  console.log('test')
  tid = setTimeout(interval, timeTimeout)

  return () => clearTimeout(tid)
}

module.exports = asyncInterval
