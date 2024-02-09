const { IMMEDIATE, QUARTERLY } = require('../../../app/constants/payment-types')

module.exports = [
  {
    order: 1,
    dueDate: '',
    paymentType: IMMEDIATE,
    period: '',
    value: '75.00'
  },
  {
    order: 2,
    dueDate: '01/03/2023',
    paymentType: QUARTERLY,
    period: 'Dec-Feb 2023',
    value: '325.00'
  },
  {
    order: 3,
    dueDate: '01/06/2023',
    paymentType: QUARTERLY,
    period: 'Mar-May 2023',
    value: '325.00'
  },
  {
    order: 4,
    dueDate: '01/09/2023',
    paymentType: QUARTERLY,
    period: 'Jun-Aug 2023',
    value: '325.00'
  }]
