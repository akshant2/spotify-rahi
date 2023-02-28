const splice = require("./splice");
const scriptRegEx = /(?<=\<script\>).*?(?=\<\/script\>)/g;
module.exports = (content) => {
	const b = scriptRegEx.exec(content);
	const s = b[0];
	return splice(content, b.index, s.length, `/*<![CDATA[*/${s}/*]]>*/`);
};
