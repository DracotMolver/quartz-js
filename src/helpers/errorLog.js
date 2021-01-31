function errorLog(condition, message) {
  if (Array.isArray(condition)) {
    let isOK = true;
    let errorMsg = '';

    for (
      var iter = 0, size = condition.length;
      iter < size;
      iter += 1
    ) {
      if (condition[iter]) {
        errorMsg = message[iter];
        isOK = false;
        break;
      }
    }

    if (!isOK) {
      throw new TypeError(errorMsg);
    }
  } else if (condition) {
    throw new TypeError(message);
  }
}

module.exports = errorLog;
