const isUndefined = require('../utils.js').isUndefined;

function isValidUpdateCreateRequest(req) {
  const { widgetName, top, left } = req.body;

  if (
    isUndefined(widgetName) ||
    isUndefined(top) ||
    isUndefined(left)
  ) {
    return false;
  }

  return true;
}

module.exports = {
  isValidUpdateCreateRequest: isValidUpdateCreateRequest,
};
