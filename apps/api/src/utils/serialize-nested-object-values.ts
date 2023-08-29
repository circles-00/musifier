export const serializeNestedObjectValues = <T extends object>(object?: T) => {
  if (!object) return object

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object') {
      serializeNestedObjectValues(value)
    } else if (typeof value === 'string') {
      Object.assign(object, { [key]: Boolean(value) })
    }
  })

  return object
}
