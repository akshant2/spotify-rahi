module.exports = (str, start, delCount, newSubStr) =>
	str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
