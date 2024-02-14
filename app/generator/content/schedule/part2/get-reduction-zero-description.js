const getReductionZeroDescription = (schedule) => {
  return {
    stack: [
      `The annual value of your ${schedule.scheme.name} (${schedule.scheme.shortName}) agreement has decreased.`,
      '\nYour payment schedule below has been revised to show the decrease. You have already been paid the full amount for the new agreement. You\'ll not receive a payment for the remaining quarter(s).'
    ],
    unbreakable: true
  }
}

module.exports = getReductionZeroDescription
