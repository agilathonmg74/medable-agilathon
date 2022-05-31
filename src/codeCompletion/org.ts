import * as vscode from 'vscode'
import { getCurrentStatement, getObjectFromQueryStatement, getOptionsForQueryStatement, getOptionsForConstsStatement, getOptionsForScriptStatement, getOptionsForCursor } from './helpers'
import { objects } from '../types/objects'
// import Logger from '../logger'

const orgProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.argumentsStatement?.endsWith('org.')) {
        return [
          new vscode.CompletionItem('objects', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('_id', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('code', vscode.CompletionItemKind.Variable)
        ]
      }

      if (currentStatement.argumentsStatement?.endsWith('org.objects.')) {
        return objects.map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable))
      }

      const objectQuery = getObjectFromQueryStatement(currentStatement.fullStatement)
      const cursorOptions = objectQuery && currentStatement.argumentsStatement !== currentStatement.fullStatement && getOptionsForCursor(currentStatement.fullStatement, objectQuery)

      if (cursorOptions) {
        return cursorOptions
      }

      if (objectQuery && currentStatement.argumentsStatement === currentStatement.fullStatement) {
        return getOptionsForQueryStatement(currentStatement.fullStatement, objectQuery)
          .map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Method))
      }

      const constsStatementOptions = getOptionsForConstsStatement(currentStatement.argumentsStatement)
      if (constsStatementOptions) {
        return constsStatementOptions.map(x => new vscode.CompletionItem(x, vscode.CompletionItemKind.Variable))
      }

      const scriptStatementOptions = getOptionsForScriptStatement(currentStatement.argumentsStatement)
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