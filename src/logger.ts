import * as vscode from 'vscode'
export default class Logger {

  static output : vscode.OutputChannel
  static log(...params: any[]) {
    let output = ''
    for (const e of params) {
      if (typeof e === 'string') {
        output = output.concat(' ', e)
      } else {
        output = output.concat(' ', JSON.stringify(e))
      }
    }
    this.output.appendLine(output)
  }

  static init() {
    this.output = vscode.window.createOutputChannel('medable-debug-output')
  }

}