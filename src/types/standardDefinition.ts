import * as vscode from 'vscode'

const _loggerData = require('../settings/loggerData.json')
const _cacheData = require('../settings/cacheData.json')
const _notifData = require('../settings/notifData.json')
const _apiData = require('../settings/apiData.json')
const _httpData = require('../settings/httpData.json')

interface StandardConfigDefinition {
    item: string,
    text: string,
    detail: string,
    documentation: string
}

const loggerData: StandardConfigDefinition[] = _loggerData
const cacheData: StandardConfigDefinition[] = _cacheData
const notifData: StandardConfigDefinition[] = _notifData
const apiData: StandardConfigDefinition[] = _apiData
const httpData: StandardConfigDefinition[] = _httpData

export { StandardConfigDefinition, loggerData, cacheData, notifData, apiData, httpData }