const getLevelPriority = (level) => {
  const introductoryLevel = 1
  const intermediateLevel = 2
  const advancedLevel = 3
  const additionalLevel = 4
  const defaultLevel = 5
  switch (level) {
    case 'Introductory':
      return introductoryLevel
    case 'Intermediate':
      return intermediateLevel
    case 'Advanced':
      return advancedLevel
    case 'Additional':
      return additionalLevel
    default:
      return defaultLevel
  }
}

module.exports = getLevelPriority
