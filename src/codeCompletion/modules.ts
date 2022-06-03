import * as vscode from 'vscode'
// eslint-disable-next-line no-unused-vars
import { loggerData, cacheData, notifData, apiData, httpData, configData, base64Data, sessionData, expressionsData, StandardConfigDefinition } from '../types/standardDefinition'
import { getCurrentStatement, mapToCompletionItem } from './helpers'

const modulesProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      let definitions: StandardConfigDefinition[] = []
      if (currentStatement.argumentsStatement?.startsWith('logger.') || currentStatement.argumentsStatement?.endsWith(' logger.')) {
        definitions = loggerData
      } else if (currentStatement.argumentsStatement?.startsWith('cache.') || currentStatement.argumentsStatement?.endsWith(' cache.')) {
        definitions = cacheData
      } else if (currentStatement.argumentsStatement?.startsWith('api.') || currentStatement.argumentsStatement?.endsWith(' api.')) {
        definitions = apiData
      } else if (currentStatement.argumentsStatement?.startsWith('notifications.') || currentStatement.argumentsStatement?.endsWith(' notifications.')) {
        definitions = notifData
      } else if (currentStatement.argumentsStatement?.startsWith('http.') || currentStatement.argumentsStatement?.endsWith(' http.')) {
        definitions = httpData
      } else if (currentStatement.argumentsStatement?.startsWith('config.') || currentStatement.argumentsStatement?.endsWith(' config.')) {
        definitions = configData
      } else if (currentStatement.argumentsStatement?.startsWith('base64.') || currentStatement.argumentsStatement?.endsWith(' base64.')) {
        definitions = base64Data
      } else if (currentStatement.argumentsStatement?.startsWith('session.') || currentStatement.argumentsStatement?.endsWith(' session.')) {
        definitions = sessionData
      } else if (currentStatement.argumentsStatement?.startsWith('expressions.') || currentStatement.argumentsStatement?.endsWith(' expressions.')) {
        definitions = expressionsData
      }

      return definitions.map(x => mapToCompletionItem(x, vscode.CompletionItemKind.Method))
    }

  },
  '.', '(' // triggered chars

)

export { modulesProvider }