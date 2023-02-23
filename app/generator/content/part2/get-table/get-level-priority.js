const getLevelPriority = (level) => {
  switch (level) {
    case 'Introductory':
      return 1
    case 'Intermediate':
      return 2
    case 'Advanced':
      return 3
    case 'Additional':
      return 4
    default:
      return 5
  }
}

module.exports = getLevelPriority
