const _objects = require('../settings/objects.json')

interface CortexObjectProperty {
  name: string,
  indexed?: boolean,
  type: string,
  sourceObject?: string
}

interface CortexObject {
  name: string,
  properties: CortexObjectProperty[]
}

const objects: CortexObject[] = _objects

export { objects, CortexObject }