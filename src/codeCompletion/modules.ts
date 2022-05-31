import * as vscode from 'vscode'
import { loggerData, cacheData, notifData } from '../types/standardDefinition'
import { getCurrentStatement } from './helpers'

const modulesProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.argumentsStatement?.startsWith('logger.') || currentStatement.argumentsStatement?.endsWith(' logger.')) {

        return loggerData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          return item
        })

      } else if (currentStatement.argumentsStatement?.startsWith('cache.') || currentStatement.argumentsStatement?.endsWith(' cache.')) {

        return cacheData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          return item
        })
      } else if (currentStatement.argumentsStatement?.startsWith('notification.') || currentStatement.argumentsStatement?.endsWith(' notification.')) {
        return notifData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
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

export { modulesProvider }