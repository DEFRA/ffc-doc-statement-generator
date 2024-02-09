const mapFundingRows = require('./map-funding-rows')
const mapTotalRow = require('./map-total-row')

const getTable = (fundings) => {
  const table = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
      body: [
        [
          { text: 'Standard', style: 'tableHeader' },
          { text: 'Level', style: 'tableHeader' },
          { text: 'Rate per ha (£)', style: 'tableHeader' },
          { text: 'Land area (ha)', style: 'tableHeader' },
          { text: 'Annual value (£)', style: 'tableHeader' },
          { text: 'Quarterly value (£)', style: 'tableHeader' },
          { text: 'Quarterly reduction (£)', style: 'tableHeader' },
          { text: 'Quarterly payment (£)', style: 'tableHeader' }
        ],
        ...mapFundingRows(fundings.filter(x => x.name !== 'Total'))
      ]
    }
  }
  const totalRow = fundings.find(x => x.name === 'Total')
  if (totalRow) {
    table.table.body.push(mapTotalRow(totalRow))
  }

  return table
}

module.exports = getTable
