const getAgreementNumber = (agreementNumber) => {
  return {
    columns: [
      { width: 200, text: 'Agreement reference number:' },
      { width: '*', text: agreementNumber }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getAgreementNumber
