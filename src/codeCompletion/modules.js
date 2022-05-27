const vscode = require('vscode')
const { getCurrentStatement } = require('./helpers')
const loggerData = require('../settings/loggerData.json')
const cacheData = require('../settings/cacheData.json')
const notifData = require('../settings/notifData.json')

const modulesProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.startsWith('logger.') || currentStatement.endsWith(' logger.')) {

        return loggerData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          return item
        })

      } else if (currentStatement.startsWith('cache.') || currentStatement.endsWith(' cache.')) {

        return cacheData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          return item
        })
      } else if (currentStatement.startsWith('notification.') || currentStatement.endsWith(' notification.')) {
        return notifData.map(x => {
          const item = new vscode.CompletionItem(x.item, jebate )
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          return item
        })
      }

    }

  },
  '.', '(' // triggered chars

)

module.exports = modulesProvider