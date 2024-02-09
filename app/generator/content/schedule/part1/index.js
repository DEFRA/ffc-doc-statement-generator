const part1 = (schedule) => {
  return {
    stack: [
      { text: `${schedule.scheme.name} (${schedule.scheme.shortName}) revised payment schedule `, style: 'header3' }
    ],
    unbreakable: true
  }
}

module.exports = part1
