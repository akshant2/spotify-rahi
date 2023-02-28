const { series, src, dest } = require("gulp");
const rename = require("gulp-rename");
const modifyFile = require("./gulp/modify-file");
const scriptTagFix = require("./gulp/script-tag-fix");
const linkTagFix = require("./gulp/link-tag-fix");

const RESOURCES = {
	src: ["build/**", "build/**/*.*", "!build/index.html"],
	dest: "", // TO BE UPDATED LATER
};
const INDEXHTML = {
	src: ["build/index.html"],
	dest: "", // TO BE UPDATED LATER
};
const ENTRYPOINT = "react.html";

const moveResources = () => src(RESOURCES.src).pipe(dest(RESOURCES.dest));
const moveIndexHtml = () =>
	src(INDEXHTML.src)
		.pipe(modifyFile(linkTagFix))
		.pipe(modifyFile(scriptTagFix))
		.pipe(rename(ENTRYPOINT))
		.pipe(dest(INDEXHTML.dest));

exports.default = series(moveResources, moveIndexHtml);
