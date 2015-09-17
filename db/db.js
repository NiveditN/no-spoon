var db = require('seraph')({
	server:'http://127.0.0.1:7474',
	user: 'neo4j',
	pass: '123'
});

module.exports = db;