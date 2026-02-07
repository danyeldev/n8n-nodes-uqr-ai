const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const path = require('path');

function buildIcons() {
	return src('nodes/**/*.{png,svg}', { base: '.' })
		.pipe(rename((filePath) => {
			filePath.dirname = path.join(filePath.dirname, '..', '..');
			return filePath;
		}))
		.pipe(dest('dist'));
}

function copyJson() {
	return src('nodes/**/*.json', { base: '.' })
		.pipe(dest('dist'));
}

exports['build:icons'] = buildIcons;
exports['build:json'] = copyJson;
exports.default = buildIcons;
