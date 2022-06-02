import * as vscode from 'vscode'
// eslint-disable-next-line no-unused-vars
import { loggerData, cacheData, notifData, apiData, httpData, configData } from '../types/standardDefinition'
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
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item
        })

      } else if (currentStatement.argumentsStatement?.startsWith('cache.') || currentStatement.argumentsStatement?.endsWith(' cache.')) {

        return cacheData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item
        })
      } else if (currentStatement.argumentsStatement?.startsWith('api.') || currentStatement.argumentsStatement?.endsWith(' api.')) {

        return apiData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item
        })
      } else if (currentStatement.argumentsStatement?.startsWith('notifications.') || currentStatement.argumentsStatement?.endsWith(' notifications.')) {

        return notifData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item

        })
      } else if (currentStatement.argumentsStatement?.startsWith('http.') || currentStatement.argumentsStatement?.endsWith(' http.')) {
        return httpData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item

        })
      } else if (currentStatement.argumentsStatement?.startsWith('config.') || currentStatement.argumentsStatement?.endsWith(' config.')) {
        return configData.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item

        })
      }

    }

  },
  '.', '(' // triggered chars

)

export { modulesProvider }