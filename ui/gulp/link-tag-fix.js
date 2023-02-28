const splice = require("./splice");
const linkRegEx = /<link\s*.*?>/g;
module.exports = (content) => {
	let a;
	while ((a = linkRegEx.exec(content))) {
		if (content.charAt(linkRegEx.lastIndex - 2) !== "/") {
			content = splice(content, linkRegEx.lastIndex - 1, 0, "/");
		}
	}
	return content;
};
