const _loggerData = require('../settings/loggerData.json')
const _cacheData = require('../settings/cacheData.json')
const _notifData = require('../settings/notifData.json')
const _apiData = require('../settings/apiData.json')
const _httpData = require('../settings/httpData.json')
const _configData = require('../settings/configData.json')
const _imports = require('../settings/imports.json')
const _expressionsData = require('../settings/expressionsData.json')

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
const configData: StandardConfigDefinition[] = _configData
const imports: StandardConfigDefinition[] = _imports
const expressionsData: StandardConfigDefinition[] = _expressionsData

export { StandardConfigDefinition, loggerData, cacheData, notifData, apiData, httpData, configData, imports, expressionsData }
