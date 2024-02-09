const getAgreementNumber = (agreementNumber) => {
  return {
    columns: [
      { width: 110, text: 'Agreement number:' },
      { width: '*', text: agreementNumber }
    ],
    style: 'column',
    columnGap: 2
  }
}

module.exports = getAgreementNumber
