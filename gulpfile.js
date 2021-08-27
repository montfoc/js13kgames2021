const { series } = require('gulp');
const fs = require('fs');
const gulp = require('gulp');
const bundleJSName = 'build.js';
const minify = require('gulp-minify');
const sourceDir = './js/';
const destinationDir = './build/';

function isUpperCase(firstChar) {
    return firstChar == firstChar.toUpperCase();
}

function isLowerCase(firstChar) {
    return firstChar == firstChar.toLowerCase();
}

function areSameCase(firstChar1, firstChar2) {
    return isUpperCase(firstChar1) && isUpperCase(firstChar2) || isLowerCase(firstChar1) && isLowerCase(firstChar2);
}

function createDestinationFolder(cb) {
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir);
    }
    cb();
}

function clean(cb) {
    if (fs.existsSync(destinationDir)) {
        fs.rmdirSync(destinationDir, {recursive:true, force:true});
    }
    cb();
}

function jsBundle(cb) {
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            throw err;
        }

        files.sort((str1, str2) => {
            if (areSameCase(str1.charAt(0), str2.charAt(0))) {
                return str1.localeCompare(str2);
            } else {
                return str2.charCodeAt(0) - str1.charCodeAt(2);
            }
        });

        const outputFileStream = fs.createWriteStream(destinationDir + bundleJSName, {flags: 'w+'});
        files.forEach(file => {
            const fileContent = fs.readFileSync(sourceDir + file);
            outputFileStream.write(fileContent + '\n\n');
        });
        outputFileStream.end();
        cb();
    });
}

function minifyJS(cb) {
    gulp.src(destinationDir + bundleJSName)
    .pipe(minify())
    .pipe(gulp.dest(destinationDir));
    cb();
}

function zip(cb) {
    cb();
}

exports.default = series(clean, createDestinationFolder, jsBundle, minifyJS);
