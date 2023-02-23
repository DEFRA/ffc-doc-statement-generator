const getBusinessName = (businessName) => {
  return {
    columns: [
      { width: 200, text: 'Business name:' },
      { width: '*', text: businessName }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getBusinessName
