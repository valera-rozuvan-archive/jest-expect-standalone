var _expect = require('expect');

window.__jest_expect_version = require('./node_modules/expect/package.json').version;
console.log('window.__jest_expect_version = ' + window.__jest_expect_version);
window.expect = _expect;

module.exports = _expect;
