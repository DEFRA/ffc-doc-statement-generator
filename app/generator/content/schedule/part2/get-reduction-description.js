const getReductionDescription = (schedule) => {
  return {
    stack: [
      `The annual value of your ${schedule.scheme.name} (${schedule.scheme.shortName}) agreement has decreased.`,
      '\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n',
      '\nPayments you\'ll receive will:\n\n',
      {
        ul: ['take account of money you\'ve already been paid',
          'be paid to you in equal amounts over the remaining quarters for this scheme year'],
        listStyle: 'square'
      }
    ],
    unbreakable: true
  }
}

module.exports = getReductionDescription
