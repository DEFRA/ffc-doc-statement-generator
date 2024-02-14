const toCurrencyString = require('../../../../../to-currency-string')
const orderFunding = require('./order-funding')

const mapFundingRows = (fundings) => {
  const orderedFundings = orderFunding(fundings)
  return orderedFundings.map(x => ([
    x.name,
    x.level,
    { text: formatZeroValues(x.rate), style: 'tableNumber' },
    { text: formatZeroValues(x.area), style: 'tableNumber' },
    { text: `${toCurrencyString(x.annualValue).substring(1)}`, style: 'tableNumber' },
    { text: `${toCurrencyString(x.quarterlyValue).substring(1)}`, style: 'tableNumber' },
    { text: `${toCurrencyString(x.quarterlyReduction).substring(1)}`, style: 'tableNumber' },
    { text: `${x.quarterlyPayment}`, style: 'tableNumber' }
  ]))
}

const formatZeroValues = (value) => {
  return Number(value) === 0 ? '' : value
}

module.exports = mapFundingRows
