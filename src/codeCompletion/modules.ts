import * as vscode from 'vscode'
// eslint-disable-next-line no-unused-vars
import { loggerData, cacheData, apiData } from '../types/standardDefinition'
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
      } else if (currentStatement.argumentsStatement?.startsWith('api.') || currentStatement.argumentsStatement?.endsWith(' api.')) {
        // return [
        //   new vscode.CompletionItem('foo', vscode.CompletionItemKind.Method)
        // ]
        return apiData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = x.documentation
          item
          return item
        })
      }

    }

  },
  '.', '(' // triggered chars

)

export { modulesProvider }