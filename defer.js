/**
 * @callback executor
 * @param {Function} resolve
 * @param {Function} reject
 *
 * @class
 */
class DeferPromise extends Promise {
    /**
     * @constructor
     * @param {executor} executor
     */
    constructor(executor) {
        let resolveMethod, rejectMethod
        super((resolve, reject) => {
            resolveMethod = resolve
            rejectMethod = reject
            if (executor && typeof executor === 'function') executor(resolve, reject)
        })

        this.resolve = resolveMethod
        this.reject = rejectMethod
    }

    /**
     * @method
     */
    resolve() {
        throw new Error('resolve method is not defined')
    }

    /**
     * @method
     * @param {Error} error
     */
    reject(error) {
        throw new Error('reject method is not defined')
    }
}

module.exports = DeferPromise
