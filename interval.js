/**
 * @param {Function} callback
 * @param {Function} [errorCallback]
 * @param {Number} [time]
 * @returns {Function} stop interval
 */
const asyncInterval = (callback, errorCallback, time = 0) => {
  if (!callback || typeof callback !== 'function') throw new TypeError('Callback should be a function')

  let errorHandler = error => console.error(error)
  let timeTimeout = 0

  if (typeof errorCallback === 'function') {
    errorHandler = errorCallback
    timeTimeout = isNaN(Number(time)) ? timeTimeout : Number(time)
  } else if (typeof errorCallback === 'number') {
    timeTimeout = isNaN(Number(errorCallback)) ? timeTimeout : Number(errorCallback)
  }

  let tid

  const interval = async () => {
    try {
      await callback()
    } catch (err) {
      errorHandler(err)
    }

    tid = setTimeout(interval, timeTimeout)
  }

  tid = setTimeout(interval, timeTimeout)

  return () => clearTimeout(tid)
}

module.exports = asyncInterval
