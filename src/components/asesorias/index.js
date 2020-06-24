const store = require('./db');
const ctrl = require('./controller');

module.exports = ctrl(store);