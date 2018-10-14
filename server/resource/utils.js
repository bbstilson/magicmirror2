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

module.exports = {
  checkStatus: checkStatus,
}
