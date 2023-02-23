const getCalculationDate = (calculated) => {
  return {
    columns: [
      { width: 200, text: 'Calculation date:' },
      { width: '*', text: calculated }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getCalculationDate
