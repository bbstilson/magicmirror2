const http = require('http');

const DEBUG = process.env.DEBUG || false;

function checkStatus (res) {
  if (res.status >= 200 && res.status <= 300) {
    if (DEBUG) {
      console.log('Status:', res.status);
    }
    return res;
  } else {
    const error = new Error(res.statusText);
    if (DEBUG) {
      console.log('Status error:', error);
    }
    throw error;
  }
}

function endWithStatus(status, res) {
  res.status(status).end(http.STATUS_CODES[status]);
}

const isUndefined = (t) => typeof t === 'undefined';

function mkJsonError(res, status = 500) {
  return (error) => {
    res.status(status).json({ error, status });
  };
}

module.exports = {
  checkStatus: checkStatus,
  endWithStatus: endWithStatus,
  isUndefined: isUndefined,
  mkJsonError: mkJsonError,
}
