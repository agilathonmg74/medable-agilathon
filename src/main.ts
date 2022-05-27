<<<<<<< HEAD:src/main.ts
import * as vscode from 'vscode'
import Logger from './logger'
import { orgProvider } from './codeCompletion/org'
import { globalsProvider } from './codeCompletion/globals'
import { importProvider } from './codeCompletion/import'
=======
const vscode = require('vscode')
const { orgProvider } = require('./codeCompletion/org')
const { globalsProvider } = require('./codeCompletion/globals')
const { importProvider } = require('./codeCompletion/import')
const { modulesProvider } = require('./codeCompletion/modules')
const Logger = require('./logger')
>>>>>>> mgudic-codecompletion:src/main.js

const medableDirs = ['org-cs', 'cortex', 'configuration']

async function activate(context: vscode.ExtensionContext) {
  if (await checkMedableWorkspace()) {
    Logger.init()
    Logger.log('activating extension')
    context.subscriptions.push(globalsProvider, orgProvider, importProvider, modulesProvider)
  }
}

const checkMedableWorkspace = async() => {
  const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : null
  if (!workspaceFolder) {
    return false
  }
  const workspaceDir = await vscode.workspace.fs.readDirectory(workspaceFolder.uri)
  const envDir = workspaceDir.find(x => medableDirs.some(y => y === x[0]) && x[1] === vscode.FileType.Directory)
  if (!envDir) {
    return false
  }

  const envDirUri = vscode.Uri.joinPath(workspaceFolder.uri, envDir[0])
  const envDirFiles = await vscode.workspace.fs.readDirectory(envDirUri)
  const manifestFile = envDirFiles.find(x => x[0] === 'manifest.json' && x[1] === vscode.FileType.File)
  if (!manifestFile) {
    return false
  }

  return true
}

export { activate }