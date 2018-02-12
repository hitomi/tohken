function parseValues (v) {
  if (!isNaN(v)) {
    return _.toNumber(v)
  }
  if (_.isString(v) && v.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/)) {
    return Date.parse(`${v} GMT+0900`)
  }
  return v
}

function mergeModel (target, source) {
  function mergeDeep (target, source, basePath = []) {
    return _.mapValues(basePath.length ? _.get(target, basePath) : target, (v, k) => {
      let getKey = _.concat(basePath, k)
      if (_.isObject(v)) return mergeDeep(target, source, getKey)
      let returnValue = parseValues(_.get(source, getKey, v))
      return returnValue
    })
  }
  return _.extend(target, mergeDeep(target, source))
}
