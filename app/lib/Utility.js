/*
 * General purpose class containing stand-alone utility methods
 */
const logger = require(`${serverRoot}/config/winston`);

class Utility {
  /**
   * Generate a random alphanumeric string
   *
   * @param {number} min - minimum string length
   * @param {number} max - maximum string length
   * @return {string} str
   */
  static getRandomString (min, max) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charLength = chars.length;
    const len = Math.floor(Math.random() * (max - min + 1)) + min;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return str;
  }

  static getMonthsOfYear () {
    return {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
  }

  /**
   * Central logger for application errors, exceptions and promise rejections
   */
  static logException (err, category = 'appError') {
    const status = typeof err.statusCode !== 'undefined' ? err.statusCode : (err.status || 500);
    const errStack = typeof err.stack === 'object' && err.stack !== null ? JSON.stringify(err.stack) : err.stack;
    logger.error(`${status} - ${category}: ${err.message}\r\n${errStack}`);
  }
}

module.exports = Utility;
