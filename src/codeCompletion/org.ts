import * as vscode from 'vscode'
import { getCurrentStatement, getObjectFromQueryStatement, getOptionsForQueryStatement, getOptionsForConstsStatement, getOptionsForScriptStatement, getOptionsForCursor } from './helpers'
import { objects } from '../types/objects'
// import Logger from '../logger'

const orgProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.endsWith('org.')) {
        return [
          new vscode.CompletionItem('objects', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('_id', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('code', vscode.CompletionItemKind.Variable)
        ]
      }

      if (currentStatement.endsWith('org.objects.')) {
        return objects.map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable))
      }

      const objectQuery = getObjectFromQueryStatement(currentStatement)
      if (objectQuery) {
        const cursorOptions = getOptionsForCursor(currentStatement, objectQuery)
        if (cursorOptions) {
          return cursorOptions
        }

        return getOptionsForQueryStatement(currentStatement, objectQuery)
          .map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Method))
      }

      const constsStatementOptions = getOptionsForConstsStatement(currentStatement)
      if (constsStatementOptions) {
        return constsStatementOptions.map(x => new vscode.CompletionItem(x, vscode.CompletionItemKind.Variable))
      }

      const scriptStatementOptions = getOptionsForScriptStatement(currentStatement)
      if (scriptStatementOptions) {
        return scriptStatementOptions.map(x => {
          const item = new vscode.CompletionItem(x, vscode.CompletionItemKind.Variable)
          return item
        })
      }
      return undefined
    }
  },
  '.', '(', ' ', '{', ',' // triggered chars
)

export { orgProvider }