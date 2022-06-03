import * as vscode from 'vscode'
import { handlePathsCursor, handleExpandCursor, handleFindCursor } from './cursors'
import { objects, CortexObject } from '../types/objects'

import { cursors } from '../types/cursor'
import { consts } from '../types/consts'
import { script } from '../types/script'
import Statement from '../types/statement'
import { StandardConfigDefinition } from '../types/standardDefinition'
// import Logger from '../logger'

const bracketPairs = {
  parentheses: ['(', ')'],
  curly: ['{', '}'],
  square: ['[', ']']
}

// #region Public

const mapToCompletionItem = (definition: StandardConfigDefinition, kind: vscode.CompletionItemKind): vscode.CompletionItem => {
  const item = new vscode.CompletionItem(definition.item, kind)
  item.insertText = definition.text
  item.detail = definition.detail
  item.documentation = new vscode.MarkdownString(definition.documentation)
  return item
}

const getCurrentStatement = (document: vscode.TextDocument, line: number, characther = -1): Statement => {
  const fullStatement = getFullStatement(document, line, characther)
  const argumentsStatements = [
    getStatementInsideOfBrackets(fullStatement, bracketPairs.parentheses),
    getStatementInsideOfBrackets(fullStatement, bracketPairs.curly),
    getStatementInsideOfBrackets(fullStatement, bracketPairs.square)
  ].filter(x => x)
    .sort((a, z) => (a?.arguments?.length || 100) - (z?.arguments?.length || 100))

  if (argumentsStatements.length > 0) {
    return new Statement(fullStatement, argumentsStatements[0]?.arguments || '')
  }

  return new Statement(fullStatement, fullStatement)
}

const getObjectFromQueryStatement = (statement: string): CortexObject | undefined => {
  const index = statement.indexOf('org.objects')
  if (index < 0) {
    return undefined
  }
  const queryStatement = statement.substring(index)
  const splitted = queryStatement.split('.')
  if (splitted.length < 3) {
    return undefined
  }

  return objects.find(x => x.name === splitted[2])

}

const getOptionsForQueryStatement = (statement: string, object: CortexObject) => {
  const splitted = statement.split('.')
  const lastElement = splitted[splitted.length - 2]

  if (lastElement === object.name) {
    return cursors
  }

  const cursor = cursors.find(x => lastElement.includes(x.item))
  if (cursor) {
    if (cursor.isContinuable) {
      return cursors
    }
  }

  return []
}

const getOptionsForConstsStatement = (statement: string | null) => {
  return getOptionsForStatementSimple(statement, 'consts.', consts)
}

const getOptionsForScriptStatement = (statement: string | null) => {
  return getOptionsForStatementSimple(statement, 'script.', script)
}

const getOptionsForCursor = (statement: string, object: CortexObject) => {
  const functionArguments = getFunctionArguments(statement)
  if (!functionArguments) {
    return null
  }
  const s = statement.substring(0, functionArguments.index)
  const cursor = cursors.find(x => s.endsWith(x.item))
  if (!cursor) {
    return null
  }
  switch (cursor.item) {
    case 'paths':
      return handlePathsCursor(object)
    case 'expand':
      return handleExpandCursor(object)
    case 'sort':
    case 'find':
      return handleFindCursor(object)
    default:
      return null
  }
}

// #endregion

// #region Private

const getStatementInsideOfBrackets = (statement: string, bracketChars: string[]) => {
  if (bracketChars.length !== 2) {
    return null
  }
  const brackets = statement.split('')
    .map((x, index) => { return { value: x, index: index } })
    .filter(x => x.value === bracketChars[0] || x.value === bracketChars[1])

  const bracketStack = []
  for (const e of brackets) {
    if (e.value === bracketChars[0]) {
      bracketStack.push(e.index)
    } else {
      bracketStack.pop()
    }
  }

  if (bracketStack.length > 0) {
    const index = bracketStack[bracketStack.length - 1]
    return { index: index, arguments: statement.substring(index + 1) || '' }
  }

  return null
}

const getFunctionArguments = (statement: string) => {
  return getStatementInsideOfBrackets(statement, bracketPairs.parentheses)
}

const getOptionsForStatementSimple = (statement: string | null, prefix: string, obj: any) => {
  if (statement === null) {
    return null
  }
  const index = statement.indexOf(prefix)
  if (index < 0) {
    return null
  }

  if (statement.endsWith(prefix)) {
    return Object.keys(obj)
  }

  const splitted = statement.substring(index)
    .split('.')

  let currentObject = obj
  for (let i = 1; i < splitted.length; i++) {
    if (!splitted[i] || splitted[i].trim() === '') {
      break
    }
    if (!currentObject[splitted[i]]) {
      return null
    }
    currentObject = currentObject[splitted[i]]
  }

  return Object.keys(currentObject)

}

const getFullStatement = (document: vscode.TextDocument, line: number, characther = -1): string => {
  const currentLine = characther < 1
    ? document.lineAt(line).text.trim()
    : document.lineAt(line).text.substring(0, characther)
      .trim()

  if (line === 0) {
    return currentLine
  }
  if (currentLine.charAt(0) !== '.') {
    return currentLine
  }

  return getFullStatement(document, line - 1)
    .concat(currentLine)
}

// #endregion

export {
  getCurrentStatement,
  getObjectFromQueryStatement,
  getOptionsForQueryStatement,
  getOptionsForConstsStatement,
  getOptionsForScriptStatement,
  getOptionsForCursor,
  mapToCompletionItem
}
