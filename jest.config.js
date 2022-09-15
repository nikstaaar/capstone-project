const {defaults} = require('jest-config');
module.exports = {
	...defaults,
	resolver: `${__dirname}/jest-resolver.js`,
};
