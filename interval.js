const asyncInterval = (callback, _errorCallback, _time = 0) => {
    if (!callback || typeof callback !== 'function')
        throw new TypeError('Callback should be a function')

    let errorCallback = error => console.error(error)
    let time = 0

    if (typeof _errorCallback === 'function') {
        errorCallback = _errorCallback
        time = isNaN(Number(_time)) ? time : Number(_time)
    } else if (typeof _errorCallback === 'number') {
        time = _errorCallback
    }

    let tid

    const interval = async () => {
        try {
            await callback()
        } catch (err) {
            errorCallback(err)
        }

        tid = setTimeout(interval, time)
    }

    tid = setTimeout(interval, time)

    return () => clearTimeout(tid)
}

module.exports = asyncInterval
