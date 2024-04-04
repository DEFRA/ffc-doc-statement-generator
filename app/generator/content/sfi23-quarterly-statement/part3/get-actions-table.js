const moment = require('moment')
const toCurrencyString = require('../../../../generator/to-currency-string')

const getActionsTable = (actionGroups, title, showGroupName, totalpayment) => {
  moment.locale('en-gb')
  const actionPaymentTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*', '*', '*'],
      body: [
        [
            { colSpan:6, text: title, style: 'tableHeader' },
            { text: ''},
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' }
        ],
        [
          { text: 'Code', style: 'tableHeader' },
          { text: 'Action', style: 'tableHeader' },
          { text: 'Rate', style: 'tableHeader' },
          { text: 'Land area', style: 'tableHeader' },
          { text: 'Annual value', style: 'tableHeader' },
          { text: 'Quarterly payment', style: 'tableHeader' }
        ]
      ]
    }
  }
   
 for( const actionGroup of actionGroups) {
    if(showGroupName === true) {
        actionPaymentTable.table.body.push([
            { colSpan:6, text: actionGroup.groupName, style: 'tableHeader' },
            { text: ''},
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' }
          ])
    }

    const groupActions =  actionGroup.actions
    for( const action of groupActions) {
      actionPaymentTable.table.body.push([
        { text: action.actionCode },
        { text: action.actionName },
        { text: action.rate },
        { text: action.landArea },
        { text: action.annualValue },
        { text: toCurrencyString(action.quarterlyPaymentAmount) }
      ])
    }
  }

   actionPaymentTable.table.body.push([
    { colSpan:4, text: 'Total',  style: 'tableNumber', bold: true },
    { text: ''},
    { text: '' },
    { text: '' },
    { colSpan:2, text: toCurrencyString(totalpayment), bold: true},
    { text: '' }
  ]) 

  return actionPaymentTable
}

module.exports = getActionsTable
