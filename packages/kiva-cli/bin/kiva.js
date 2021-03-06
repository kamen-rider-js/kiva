#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')

// 检查 node 版本
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.
      \nPlease upgrade your Node version.`
    ))
    process.exit(1)
  }
}
checkNodeVersion(require('../package.json').engines.node, 'kiva-cli')


const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

// create
program
  .command('create <project-name>')
  .description('create a new project')
  .action((projectName, cmd) => {
    require('../scripts/create')(projectName)
  })

// new
program
  .command('new <component-name>')
  .description('new a standard component')
  .action((componentName, cmd) => {
    require('../scripts/new')(componentName)
  })

// serve
program
  .command('serve')
  .description('serve demo and debug')
  .action((siteType, cmd) => {
    require('../scripts/serve')(siteType)
  })

// build
program
  .command('build <type>')
  .description('build lib')
  .action((type, cmd) => {
    require('../scripts/build')(type)
  })

// deploy
program
  .command('deploy')
  .description('deploy by ftp')
  .action((type, cmd) => {
    require('../scripts/deploy')()
  })

program.parse(process.argv)
