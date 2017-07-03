//'use strict';
function TimeoutHandler()
{
	clearTimeout(id);
	console.log ('CLEAR');
}

var id;
id = setTimeout(TimeoutHandler, 10);
console.log ('SET');

var configure = function () {
	this.setDefaultTimeout(1000000);
};

module.exports = configure;