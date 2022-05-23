const { orgProvider } = require('./codeCompletion/org')
const { globalsProvider } = require('./codeCompletion/globals')
const Logger = require('./logger')

function activate(context) {
  Logger.init()
  context.subscriptions.push(globalsProvider, orgProvider)
}

module.exports.activate = activate