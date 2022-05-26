import * as vscode from 'vscode'
import { handlePathsCursor, handleExpandCursor, handleFindCursor } from './cursors'
import { objects, CortexObject } from '../types/objects'

import { cursors } from '../types/cursor'
import { consts } from '../types/consts'
import { script } from '../types/script'

const bracketPairs = {
  parentheses: ['(', ')'],
  curly: ['{', '}'],
  square: ['[', ']']
}

// #region Public

const getCurrentStatement = (document: vscode.TextDocument, line: number, characther = -1): string => {
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

  return getCurrentStatement(document, line - 1)
    .concat(currentLine)
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

  const cursor = cursors.find(x => lastElement.includes(x.name))
  if (cursor) {
    if (cursor.isContinuable) {
      return cursors
    }
  }

  return []
}

const getOptionsForConstsStatement = (statement: string) => {
  return getOptionsForStatementSimple(statement, 'consts.', consts)
}

const getOptionsForScriptStatement = (statement: string) => {
  return getOptionsForStatementSimple(statement, 'script.', script)
}

const getOptionsForCursor = (statement: string, object: CortexObject) => {
  const functionArguments = getFunctionArguments(statement)
  if (!functionArguments) {
    return null
  }
  const s = statement.substring(0, functionArguments.index)
  const cursor = cursors.find(x => s.endsWith(x.name))
  if (!cursor) {
    return null
  }
  switch (cursor.name) {
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
}

const getFunctionArguments = (statement: string) => {
  return getStatementInsideOfBrackets(statement, bracketPairs.parentheses)
}

const getOptionsForStatementSimple = (statement: string, prefix: string, obj: any) => {
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

// #endregion

export {
  getCurrentStatement,
  getObjectFromQueryStatement,
  getOptionsForQueryStatement,
  getOptionsForConstsStatement,
  getOptionsForScriptStatement,
  getOptionsForCursor
}
