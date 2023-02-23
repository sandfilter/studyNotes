const fs = require('fs');
fs.readFile('./test.js', 'utf8',(err, data) => {
	if(err) throw err;
	console.log(data);
})
