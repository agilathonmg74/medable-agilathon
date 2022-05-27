const _loggerData = require('../settings/loggerData.json')
const _cacheData = require('../settings/cacheData.json')
const _notifData = require('../settings/notifData.json')

interface StandardConfigDefinition {
    item: string,
    text: string,
    detail: string,
    documentation: string
}

const loggerData: StandardConfigDefinition[] = _loggerData
const cacheData: StandardConfigDefinition[] = _cacheData
const notifData: StandardConfigDefinition[] = _notifData

export { StandardConfigDefinition, loggerData, cacheData, notifData }