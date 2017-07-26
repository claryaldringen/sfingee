
var repair = function(val) {
	if(val*1 < 10) return '0' + val;
	return val;
};

module.exports = repair;
