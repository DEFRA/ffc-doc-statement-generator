const getBusinessName = (businessName) => {
  return {
    columns: [
      { width: 88, text: 'Business name:' },
      { width: '*', text: businessName }
    ],
    style: 'column',
    columnGap: 2
  }
}

module.exports = getBusinessName
