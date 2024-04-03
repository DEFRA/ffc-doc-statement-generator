const getActionsTable = require('./get-actions-table')
const getTotalPaymentTable = require('./get-total-payment-table')

const part3 = (sfi23QuarterlyStatement) => {
  const quarter = 4
  const actions = sfi23QuarterlyStatement.actionGroups
  const nonAdditionalPaymentGroupName = "Actions"
  const additionalPaymentGroupName = "Additional payment"
  const nonAdditionalPaymentActionGroup = actions.filter(val => val.groupName !== additionalPaymentGroupName)
  const additionalPaymentActionGroup = actions.filter(val => val.groupName === additionalPaymentGroupName)

  return {
    stack: [
      { text: 'How your payment was calculated', style: 'header3' },
      { text: 'We calculated your total payment by adding together:' },
      {
        ul: [{
          text: [
            'the quarterly payments for your actions '
          ]
        },
        {
          text: [
            'any additional payments '
          ]
        }],
        listStyle: 'square',
        margin: [ 15, 2, 10, 20 ]
      },
      {
        text: [
          'You can check which of your land parcels are part of each action in your SFI 2023 agreement. Find your SFI 2023 agreement by logging into the Rural Payments service at ',
          { text: 'https://www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' }
        ]
      },
      getActionsTable(nonAdditionalPaymentActionGroup, nonAdditionalPaymentGroupName, true, (sfi23QuarterlyStatement.totalActionPayments/quarter).toFixed(2)),
      getActionsTable(additionalPaymentActionGroup, additionalPaymentGroupName, false, (sfi23QuarterlyStatement.totalAdditionalPayments/quarter).toFixed(2)),
      getTotalPaymentTable((sfi23QuarterlyStatement.totalPayments/quarter).toFixed(2))
    ],
    unbreakable: true
  }
}

module.exports = part3
