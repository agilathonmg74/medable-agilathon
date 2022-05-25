const vscode = require('vscode')
const { orgProvider } = require('./codeCompletion/org')
const { globalsProvider } = require('./codeCompletion/globals')
const { importProvider } = require('./codeCompletion/import')
const Logger = require('./logger')

const medableDirs = ['org-cs', 'cortex', 'configuration']

async function activate(context) {
  if (await checkMedableWorkspace()) {
    Logger.init()
    Logger.log('activating extension')
    context.subscriptions.push(globalsProvider, orgProvider, importProvider)
  }
}

const checkMedableWorkspace = async() => {
  const workspaceFolder = vscode.workspace.workspaceFolders[0]
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

module.exports.activate = activate