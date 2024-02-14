const getRecoveryDescription = (schedule) => {
  return {
    stack: [
      `The annual value of your ${schedule.scheme.name} (${schedule.scheme.shortName}) agreement has decreased.`,
      '\nYour payment schedule below has been revised to show the decrease. You have already received more money than the new agreement value. A recovery payment is now due.\n'
    ],
    unbreakable: true
  }
}

module.exports = getRecoveryDescription
