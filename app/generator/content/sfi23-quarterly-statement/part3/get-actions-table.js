const moment = require('moment')

const getActionsTable = (actionGroups, title, showGroupName, totalpayment) => {
  moment.locale('en-gb')
  const actionPaymentTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 2,
      keepWithHeaderRows: true,
      widths: ['*', '*', '*', '*', '*', '*'],
      body: [
        [
          { colSpan: 6, text: title, style: 'tableHeader' },
          { text: '' },
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

  for (const actionGroup of actionGroups) {
    if (showGroupName === true) {
      actionPaymentTable.table.body.push([
        { colSpan: 6, text: actionGroup.groupName, style: 'tableHeader' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' }
      ])
    }

    const groupActions = actionGroup.actions
    for (const action of groupActions) {
      const landArea = action.landArea !== undefined && action.landArea !== null ? Number(action.landArea).toString() : ''
      const uom = action.uom !== undefined && action.uom !== null ? action.uom : ''
      actionPaymentTable.table.body.push([
        { text: action.actionCode },
        { text: action.actionName },
        { text: action.rate },
        { text: landArea + uom },
        { text: action.annualValue },
        { text: `£${new Intl.NumberFormat().format(Number(action.quarterlyPaymentAmount)).toString()}` }
      ])
    }
  }

  actionPaymentTable.table.body.push([
    { colSpan: 5, text: 'Total', style: 'tableNumber', bold: true },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: `£${new Intl.NumberFormat().format(Number(totalpayment)).toString()}`, bold: true }
  ])

  return actionPaymentTable
}

module.exports = getActionsTable
