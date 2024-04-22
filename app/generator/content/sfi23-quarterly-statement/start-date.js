const getStartDate = (agreementStart) => {
  return {
    columns: [
      { width: 200, text: 'Start date:' },
      { width: '*', text: agreementStart }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getStartDate
