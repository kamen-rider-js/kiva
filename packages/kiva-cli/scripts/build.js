process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const spawn = require('../utils/spawn')


function webpackBuild(type) {
  const getWebpackConfig = require(`../webpack/prod.${type}`)
  // console.log('=== webpack config ===', getWebpackConfig())
  const compiler = webpack(getWebpackConfig())

  return new Promise((resolve, reject) => {

    compiler.run((err, status) => {
      if (err) {
        return reject(err)
      }
      const resFormated = status.toJson({ all: false, warnings: true, errors: true })
      if (resFormated.errors.length) {
        return reject(resFormated.errors.join('\n\n'))
      }
      return resolve(resFormated)
    })
  })
}

async function build(type) {
  console.log('start build', type)
  console.log()

  await webpackBuild(type)

  // 组件打包使用 gulp
  // if (type === 'component') {
  //   const gulpfile = path.resolve(__dirname, '../gulp/buildComponent.js')

  //   // gulp 默认会自动切换环境到配置文件所在的目录，需要使用 --cwd 显示声明
  //   // https://github.com/gulpjs/gulp/issues/523
  //   const child = spawn('gulp', [
  //     '--gulpfile',
  //     gulpfile,
  //     '--cwd',
  //     process.cwd(),
  //   ],
  //   { cwd: process.cwd() })
  //   return child
  // }

  if (type === 'component') {
    const gulpfile = path.resolve(__dirname, '../gulp/buildComponents.js')

    // gulp 默认会自动切换环境到配置文件所在的目录，需要使用 --cwd 显示声明
    // https://github.com/gulpjs/gulp/issues/523
    const child = await spawn('gulp', [
      '--gulpfile',
      gulpfile,
      '--cwd',
      process.cwd(),
    ],
    { cwd: process.cwd() })
    return child
  }

  if (type === 'noCompile') {
    const gulpfile = path.resolve(__dirname, '../gulp/buildComponentsSource.js')

    // gulp 默认会自动切换环境到配置文件所在的目录，需要使用 --cwd 显示声明
    // https://github.com/gulpjs/gulp/issues/523
    const child = await spawn('gulp', [
      '--gulpfile',
      gulpfile,
      '--cwd',
      process.cwd(),
    ],
    { cwd: process.cwd() })
    return child
  }


}

module.exports = function(...args) {
  return build(...args).then(res => {
    console.log('build success', res)
  }).catch(err => {
    console.error(chalk.red(`build error`, err))
    process.exit(1)
  })
}
