const getEndDate = (agreementEnd) => {
  return {
    columns: [
      { width: 200, text: 'End date:' },
      { width: '*', text: agreementEnd }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getEndDate
