const { orgObjectsProvider, orgProvider } = require('./codeCompletion/org')

function activate(context) {
  context.subscriptions.push(orgObjectsProvider, orgProvider)
}

module.exports.activate = activate