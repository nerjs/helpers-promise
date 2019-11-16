/**
 * @param {Number} time
 * @returns {Promise<void>}
 */
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

module.exports = sleep
