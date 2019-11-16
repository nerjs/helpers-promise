const asyncInterval = (callback, time = 0) => {
    if (!callback || typeof callback !== 'function')
        throw new TypeError('Callback should be a function')
    let tid

    const interval = async () => {
        await callback()
        tid = setTimeout(interval, time)
    }

    tid = setTimeout(interval, time)

    return () => clearTimeout(tid)
}

module.exports = asyncInterval
