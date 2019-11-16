class DeferPromise extends Promise {
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

    resolve() {
        throw new Error('resolve method is not defined')
    }

    reject() {
        throw new Error('reject method is not defined')
    }
}

module.exports = DeferPromise
