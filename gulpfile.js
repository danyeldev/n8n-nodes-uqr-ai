const { src, dest } = require('gulp');

function buildIcons() {
	return src('nodes/**/*.{png,svg}', { base: '.' })
		.pipe(dest('dist'));
}

function copyJson() {
	return src('nodes/**/*.json', { base: '.' })
		.pipe(dest('dist'));
}

exports['build:icons'] = buildIcons;
exports['build:json'] = copyJson;
exports.default = buildIcons;
