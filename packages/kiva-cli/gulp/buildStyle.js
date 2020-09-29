const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const path = require('path')
const del = require('del')
const glob = require('glob')
const fs = require('fs-extra')

const basePath = path.resolve(process.cwd(), './src')

// 编译及输出组件css
// src/components/button/src/index.less  ->   lib/button/style/index.css      less 编译为 css
function taskBuildPackageStyle() {
  const destDir = path.resolve(process.cwd(), './lib')
  return gulp.src(`${basePath}/components/**/src/index.{css,less}`)
    .pipe(less())
    .pipe(rename(function(filePath) {
      // { dirname: 'dialog/src', basename: 'index', extname: '.css' }
      return {
        dirname: filePath.dirname.replace('/src', '/style'),
        basename: 'index',
        extname: '.css'
      }
    }))
    .pipe(gulp.dest(function(file) {
      return path.resolve(file.cwd, './lib')
    }))
}

// 编译公共 css
function taskBuildCommonStyle() {
  const destDir = path.resolve(process.cwd(), './lib/styles')
  return gulp.src(`${basePath}/styles/index.{css,less}`)
    .pipe(less())
    .pipe(gulp.dest(destDir))
}

// 生成组件样式的入口文件
// lib/button/style/index.js       引入组件样式 index.css, 以及全局样式
function taskGenStyleIndexFile(done) {
  const destDir = path.resolve(process.cwd(), './lib')
  const cssFiles = glob.sync(`${destDir}/**/style/index.css`)
  cssFiles.forEach(file => {
    const jsFile = file.replace(/index.css$/, 'index.js')
    fs.writeFileSync(jsFile, `import './index.css'`)
  })
  done()
}

exports.default = gulp.series(taskBuildPackageStyle, taskBuildCommonStyle, taskGenStyleIndexFile)